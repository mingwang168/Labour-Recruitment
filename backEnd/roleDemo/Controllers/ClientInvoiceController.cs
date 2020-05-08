using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using labourRecruitment.Models.LabourRecruitment;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


namespace labourRecruitment.Controllers
{
    [Route("api/[controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [ApiController]
    public class ClientInvoiceController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ClientInvoiceController(ApplicationDbContext context)
        {
            _context = context;
        }

        public static bool IsSameWeek(DateTime dt1, DateTime dt2)
        {
            TimeSpan ts = (dt1 - dt2).Duration();
            return !(ts.TotalDays >= 7 || (DateTime.Compare(dt1, dt2) > 0 ? (dt1.DayOfWeek < dt2.DayOfWeek) : (dt1.DayOfWeek > dt2.DayOfWeek)));
        }


        [HttpPut]
        public IActionResult GetInvoice([FromBody] JobLabourer input)
        {
            List<ResultVM> results = new List<ResultVM>();
            var jobLabourers = _context.JobLabourer.Where(jb => jb.StartDay == input.StartDay && jb.EndDay == input.EndDay && jb.JobId == input.JobId)
                .Select(l => new JobLabourer
                {
                    SkillId = l.SkillId,
                    LabourerId = l.LabourerId,
                    Labourer = l.Labourer,
                    Skill = l.Skill,
                    JobId = l.JobId,
                    StartDay = l.StartDay,
                    EndDay = l.EndDay
                }).ToList();

            foreach (JobLabourer jb in jobLabourers)
            {
                var rate = _context.Skill.FirstOrDefault(s => s.SkillId == jb.SkillId).AdminReceives;
                var i = _context.LabourerAttendance.Where(la => la.LabourerId == jb.Labourer.LabourerId && la.JobId == jb.JobId
                && la.Date.CompareTo(jb.StartDay) >= 0 && la.Date.CompareTo(jb.EndDay) <= 0 && la.DailyQualityRating > 0).Count();
                results.Add(new ResultVM
                {
                    WorkedDays = i,
                    TotalHours = i * 8,
                    TotalAmount = rate * 8 * i,
                    Labourer = jb.Labourer,
                    Skill = jb.Skill
                });


            }
            return new ObjectResult(results);

        }

        [HttpGet("{jobId}")]
        public IActionResult GetInvoiceWeeks(int jobId)
        {
            var isInJobLabourer = _context.JobLabourer.Any(jl => jl.JobId == jobId);
            List<Week> weeks = new List<Week>();
            if (isInJobLabourer)
            {
                var start = _context.Job.FirstOrDefault(j => j.JobId == jobId).StartDate;
                var end = _context.Job.FirstOrDefault(j => j.JobId == jobId).EndDate;

                if (IsSameWeek(start, end))
                {
                    var week = new Week
                    {
                        FirstDay = start,
                        LastDay = end,
                        JobId = jobId
                    };
                    weeks.Add(week);
                }
                else
                {
                    int day = (int)start.DayOfWeek;
                    DateTime firstLast = new DateTime();
                    switch (day)
                    {
                        case 1:
                            firstLast = start.AddDays(5);
                            break;
                        case 2:
                            firstLast = start.AddDays(4);
                            break;
                        case 3:
                            firstLast = start.AddDays(3);
                            break;
                        case 4:
                            firstLast = start.AddDays(2);
                            break;
                        case 5:
                            firstLast = start.AddDays(1);
                            break;
                        case 6:
                            firstLast = start.AddDays(0);
                            break;
                    }
                    var firsWeek = new Week()
                    {
                        FirstDay = start,
                        LastDay = firstLast,
                        JobId = jobId
                    };
                    weeks.Add(firsWeek);
                    for (var i = start; i <= end; i = i.AddDays(1))
                    {
                        if (i.DayOfWeek.ToString() == "Sunday")
                        {
                            if (IsSameWeek(i, end))
                            {
                                var week = new Week()
                                {
                                    FirstDay = i,
                                    LastDay = end,
                                    JobId = jobId
                                };
                                weeks.Add(week);
                            }
                            else
                            {
                                var week = new Week()
                                {
                                    FirstDay = i,
                                    LastDay = i.AddDays(6),
                                    JobId = jobId
                                };
                                weeks.Add(week);
                            }
                        }
                    }
                }
            }
            return new ObjectResult(weeks);
        }

        public class Week
        {
            public DateTime FirstDay { get; set; }
            public DateTime LastDay { get; set; }
            public int JobId { get; set; }
        }


        //[HttpGet]
        //public async Task<IActionResult> GetClientInvoice([FromBody] Input input)
        //{
        //    var job = _context.Job.Find(input.jobId);
        //    var skills = await _context.JobSkill.Where(js => js.JobId == input.jobId).Select(ojs => ojs.Skill).ToListAsync();
        //    var clientName = _context.Client.FirstOrDefault(c => c.ClientId == job.ClientId).ClientName;

        //    var clientInvoice = new ClientInvoiceVM()
        //    {
        //        JobId = input.jobId,
        //        JobName = job.Title,
        //        ClientName = clientName,
        //        StartDate = job.StartDate,
        //        EndDate = job.EndDate,
        //        Total = 0,
        //        Labourers = null
        //    };

        //    List<SkillVM> skillvms = skills.Select(s => new SkillVM 
        //    {
        //        SkillId = s.SkillId,
        //        SkillName = s.SkillName,
        //        Quantity = 0,
        //        Hours = 0,
        //        Rate = s.AdminReceives,
        //        Total = 0
        //    }).ToList();
        //    decimal? totalpaid = 0;
        //    foreach (SkillVM sk in skillvms)
        //    {
        //        var joblabourers = _context.JobLabourer.Where(jl => jl.SkillId == sk.SkillId && jl.JobId == input.jobId);
        //        var quantity = 0;
        //        var rate = sk.Rate;

        //        foreach (JobLabourer joblabourer in joblabourers)
        //        {
        //            var oneQuantity = _context.LabourerAttendance
        //                 .Where(la => IsSameWeek(la.Date, input.dateInput) && la.JobId == input.jobId && la.DailyQualityRating != null && la.DailyQualityRating != 0 && la.LabourerId == joblabourer.LabourerId)
        //                 .Count();
        //            quantity = quantity + oneQuantity;
        //        };

        //        sk.Quantity = quantity;
        //        sk.Hours = quantity * 8;
        //        sk.Rate = rate;
        //        sk.Total = quantity * 8 * rate;
        //        totalpaid += quantity * 8 * rate;
        //    }
        //    clientInvoice.Total = totalpaid;
        //    clientInvoice.Labourers = skillvms;

        //    if (clientInvoice != null)
        //    {
        //        return new ObjectResult(clientInvoice);
        //    }
        //    else
        //    {
        //        return NotFound();
        //    }

        //}

        public class ResultVM
        {
            public int WorkedDays { get; set; }
            public int TotalHours { get; set; }
            public decimal TotalAmount { get; set; }
            public Labourer Labourer { get; set; }
            public Skill Skill { get; set; }
        }

        //public class ClientInvoiceVM
        //{
        //    public int JobId { get; set; }
        //    public string JobName { get; set; }
        //    public string ClientName { get; set; }
        //    public DateTime StartDate { get; set; }
        //    public DateTime EndDate { get; set; }
        //    public decimal? Total { get; set; }
        //    public List<SkillVM> Labourers { get; set; }
        //}

        //public class SkillVM
        //{
        //    public int SkillId { get; set; }
        //    public string SkillName { get; set; }
        //    public int Quantity { get; set; }
        //    public int Hours { get; set; }
        //    public decimal? Rate { get; set; }
        //    public decimal? Total { get; set; }

        //}
        //public class Input
        //{
        //    public int jobId { get; set; }
        //    public DateTime dateInput { get; set; }
        //}
    }
}
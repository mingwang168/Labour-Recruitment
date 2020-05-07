using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using labourRecruitment.Models.LabourRecruitment;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace labourRecruitment.Controllers
{
    [Route("api/[controller]")]
    //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
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
        public async Task<IActionResult> GetInvoice([FromBody] JobLabourer input)
        {
            var jobLabourers = _context.JobLabourer.Where(jb => jb.StartDay == input.StartDay && jb.EndDay == input.EndDay && jb.JobId == input.JobId)
                .Select(l=> new JobLabourer { 
                    SkillId = l.SkillId,
                    Labourer = l.Labourer,
                    JobId = l.JobId,
                    StartDay = l.StartDay,
                    EndDay = l.EndDay
                }).ToList();
            var list = jobLabourers.GroupBy(jb => jb.SkillId).ToList();
            foreach(var li in list)
            {

            }
            return new ObjectResult("OK");
        }

        [HttpGet]
        public async Task<IActionResult> GetClientInvoice([FromBody] Input input)
        {
            var job = _context.Job.Find(input.jobId);
            var skills = await _context.JobSkill.Where(js => js.JobId == input.jobId).Select(ojs => ojs.Skill).ToListAsync();
            var clientName = _context.Client.FirstOrDefault(c => c.ClientId == job.ClientId).ClientName;

            var clientInvoice = new ClientInvoiceVM()
            {
                JobId = input.jobId,
                JobName = job.Title,
                ClientName = clientName,
                StartDate = job.StartDate,
                EndDate = job.EndDate,
                Total = 0,
                Labourers = null
            };

            List<SkillVM> skillvms = skills.Select(s => new SkillVM 
            {
                SkillId = s.SkillId,
                SkillName = s.SkillName,
                Quantity = 0,
                Hours = 0,
                Rate = s.AdminReceives,
                Total = 0
            }).ToList();
            decimal? totalpaid = 0;
            foreach (SkillVM sk in skillvms)
            {
                var joblabourers = _context.JobLabourer.Where(jl => jl.SkillId == sk.SkillId && jl.JobId == input.jobId);
                var quantity = 0;
                var rate = sk.Rate;

                foreach (JobLabourer joblabourer in joblabourers)
                {
                    var oneQuantity = _context.LabourerAttendance
                         .Where(la => IsSameWeek(la.Date, input.dateInput) && la.JobId == input.jobId && la.DailyQualityRating != null && la.DailyQualityRating != 0 && la.LabourerId == joblabourer.LabourerId)
                         .Count();
                    quantity = quantity + oneQuantity;
                };

                sk.Quantity = quantity;
                sk.Hours = quantity * 8;
                sk.Rate = rate;
                sk.Total = quantity * 8 * rate;
                totalpaid += quantity * 8 * rate;
            }
            clientInvoice.Total = totalpaid;
            clientInvoice.Labourers = skillvms;

            if (clientInvoice != null)
            {
                return new ObjectResult(clientInvoice);
            }
            else
            {
                return NotFound();
            }

        }

        public class ClientInvoiceVM
        {
            public int JobId { get; set; }
            public string JobName { get; set; }
            public string ClientName { get; set; }
            public DateTime StartDate { get; set; }
            public DateTime EndDate { get; set; }
            public decimal? Total { get; set; }
            public List<SkillVM> Labourers { get; set; }
        }

        public class SkillVM
        {
            public int SkillId { get; set; }
            public string SkillName { get; set; }
            public int Quantity { get; set; }
            public int Hours { get; set; }
            public decimal? Rate { get; set; }
            public decimal? Total { get; set; }

        }
        public class Input
        {
            public int jobId { get; set; }
            public DateTime dateInput { get; set; }
        }
        }
}
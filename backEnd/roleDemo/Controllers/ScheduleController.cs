using System;
using System.Collections.Generic;
using System.Linq;
using labourRecruitment.Models.LabourRecruitment;
using labourRecruitment.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace labourRecruitment.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ScheduleController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ScheduleController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPut]
        public IActionResult AddScheduleForTwoWeekJob([FromBody]Job job)
        {
            var jobSelected = _context.Job.Where(j => j.JobId == job.JobId).FirstOrDefault();
            var duration = jobSelected.EndDate - jobSelected.StartDate;
            var jobSkillSelected = _context.Job.Where(j => j.JobId == job.JobId).Select(j => j.JobSkill).FirstOrDefault();
            HighestRatedLabourers rated = new HighestRatedLabourers(_context);
            ScheduleRepo scheduleRepo = new ScheduleRepo(_context);
        
            foreach (JobSkill js in jobSkillSelected)
            {
                var ratedLabourers = rated.GetHighestRatedLabourers(js.SkillId).ToList();
                List<Labourer> labourers = new List<Labourer>();
                labourers.AddRange(ratedLabourers.GetRange(0, js.NumberNeeded));

                foreach (Labourer labourer in labourers)
                {
                    _context.Labourer.FirstOrDefault(l => l.LabourerId == labourer.LabourerId).IsAvailable = false;

                    _context.JobLabourer.Add(new JobLabourer
                    {
                        JobId = job.JobId,
                        SkillId = js.SkillId,
                        LabourerId = labourer.LabourerId,
                        LabourerSafetyRating = 5,
                        SafetyMeetingCompleted = false,
                        ClientQualityRating = 0,
                        StartDay = jobSelected.StartDate,
                        EndDay = jobSelected.EndDate,
                        Duration = ScheduleRepo.GetBusinessDays(jobSelected.StartDate, jobSelected.EndDate)
                    });
                    scheduleRepo.PopulateLabourerAttendance(job.JobId, labourer.LabourerId, jobSelected.StartDate, jobSelected.EndDate);
                }
                _context.SaveChanges();
            }
            return new ObjectResult(job);
        }


    }

}


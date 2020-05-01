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

        [HttpPut("{jobId}")]
        public IActionResult AddLabourersToFirstSchedule(int jobId)
        {
            var jobSelected = _context.Job.Where(j => j.JobId == jobId).FirstOrDefault();
            var jobSkillSelected = _context.Job.Where(j => j.JobId == jobId).Select(j => j.JobSkill).FirstOrDefault();
            ScheduleRepo scheduleRepo = new ScheduleRepo(_context);
            var duration = (jobSelected.EndDate - jobSelected.StartDate).TotalDays;
            DateTime eDate;
            if (duration <= 14)
            {
               eDate = jobSelected.EndDate;
            } 
            else
            {
                eDate = jobSelected.StartDate.AddDays(ScheduleRepo.CalculateLastDay(jobSelected.StartDate));
            }

            HighestRatedLabourers rated = new HighestRatedLabourers(_context);
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
                        JobId = jobId,
                        SkillId = js.SkillId,
                        LabourerId = labourer.LabourerId,
                        LabourerSafetyRating = 5,
                        SafetyMeetingCompleted = false,
                        ClientQualityRating = 0,
                        StartDay = jobSelected.StartDate,
                        EndDay = eDate,
                        Duration = ScheduleRepo.GetBusinessDays(jobSelected.StartDate, eDate)
                    });
                    scheduleRepo.PopulateLabourerAttendance(jobId, labourer.LabourerId, jobSelected.StartDate, eDate);
                }
                _context.SaveChanges();

            }

            return new ObjectResult(jobId);
        }

        
    }

}


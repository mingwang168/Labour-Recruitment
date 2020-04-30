using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using labourRecruitment.Models.LabourRecruitment;
using labourRecruitment.Repositories;
using labourRecruitment.ViewModels;
using Microsoft.AspNetCore.Http;
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
        public IActionResult AddFirstSchedule([FromBody]Job job)
        {
            var jobSelected = _context.Job.Where(j => j.JobId == job.JobId).FirstOrDefault();
            var jobSkillSelected = _context.Job.Where(j => j.JobId == job.JobId).Select(j => j.JobSkill).FirstOrDefault();
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
                        JobId = job.JobId,
                        SkillId = js.SkillId,
                        LabourerId = labourer.LabourerId,
                        LabourerSafetyRating = 5
                    });
                }
                _context.SaveChanges();

            }

            return new ObjectResult(job);
        }


    }
}
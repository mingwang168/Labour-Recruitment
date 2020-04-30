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

        [HttpPut("{id}")]
        public IActionResult AddFirstSchedule([FromBody] JobSkillVM jobSkillVM)
        {
            var jobSelected = _context.Job.Where(j => j.JobId == jobSkillVM.Job.JobId).FirstOrDefault();
            List <Labourer> labourers = new List<Labourer>();
            HighestRatedLabourers rated = new HighestRatedLabourers(_context);

            foreach (JobSkill skill in jobSkillVM.JobSkills)
            {
                List <Labourer> ratedLabourers = rated.GetHighestRatedLabourers(skill.SkillId).ToList();
               //Array.Copy(ratedLabourers, labourers, skill.NumberNeeded);

            }
            
            return new ObjectResult(jobSkillVM);
        }
    }
}
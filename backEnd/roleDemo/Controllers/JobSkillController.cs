using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using labourRecruitment.Models.LabourRecruitment;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace labourRecruitment.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobSkillController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public JobSkillController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetJobSkills(int id)
        {
            var jobSkills =  _context.JobSkill.Where(js=>js.JobId==id);

            if (jobSkills == null)
            {
                return NotFound();
            }

            return new ObjectResult(jobSkills);
        }

    }
}
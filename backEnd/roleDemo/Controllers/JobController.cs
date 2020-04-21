using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using labourRecruitment.Models.LabourRecruitment;
using labourRecruitment.ViewModels;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace labourRecruitment.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public JobController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Skills/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Job>> GetJob(int id)
        {
            var job = await _context.Job.FindAsync(id);

            if (job == null)
            {
                return NotFound();
            }

            return job;
        }

        // POST: api/Job
        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult<Job>> PostJob(JobSkillVM jobSkill)
        {
            
            _context.Job.Add(jobSkill.Job);

            foreach (JobSkill js in jobSkill.JobSkills) {
                js.JobId = jobSkill.Job.JobId;
                _context.JobSkill.Add(js);
            }

            await _context.SaveChangesAsync();

            return new ObjectResult(jobSkill); 
           // return CreatedAtAction("GetJob", new { id = jobSkill.Job.JobId }, jobSkill);
        }

    }
}
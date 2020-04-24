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
using Microsoft.EntityFrameworkCore;

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

        // GET: api/Jobs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Job>>> GetJob()
        {
            return await _context.Job.ToListAsync();
        }

        // GET: api/Skills/5
        [HttpGet("{id}")]
        public IActionResult GetJob(int id)
        {
            var job = _context.Job.Where(j => j.JobId == id).FirstOrDefault();
            int clientId = job.ClientId;

            if (job == null)
            {
                return NotFound();
            }

            var client = _context.Client.Where(c => c.ClientId == clientId).FirstOrDefault();
            JobVM jobClient = new JobVM();
            jobClient.ClientName = client.ClientName;
            jobClient.Job = job;
            return new ObjectResult(jobClient);
        }

        // POST: api/Job
        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult PostJob(JobSkillVM jobSkill)
        {
            
            _context.Job.Add(jobSkill.Job);

            foreach (JobSkill js in jobSkill.JobSkills) {
                js.JobId = jobSkill.Job.JobId;
                _context.JobSkill.Add(js);
            }

            _context.SaveChangesAsync();

            return new ObjectResult(jobSkill.Job.JobId); 
   
        }

    }
}
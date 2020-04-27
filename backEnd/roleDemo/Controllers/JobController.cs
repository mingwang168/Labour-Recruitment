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
    [Route("api/[controller]/[action]")]
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


        [HttpGet("{id}", Name = "GetJob")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetJob(int id)
        {
           
            var job = await _context.Job.FindAsync(id);
            job.JobSkill = await _context.JobSkill.Where(js => js.JobId == id).Select(ojs => new JobSkill()
            {
                JobSkillId = ojs.JobSkillId,
                JobId = ojs.JobId,
                SkillId = ojs.SkillId,
                NumberNeeded = ojs.NumberNeeded,
                Skill = ojs.Skill
            }).ToListAsync();
            job.Client = _context.Client.Where(c => c.ClientId == job.ClientId).Select(c => new Client()
            {
                ClientName = c.ClientName
            }).FirstOrDefault();
            job.JobLabourer = await _context.JobLabourer.Where(jl => jl.JobId == id).Select(ojl => new JobLabourer()
            {
                JobLabourerId = ojl.JobLabourerId,
                JobId = ojl.JobId,
                LabourerId = ojl.LabourerId,
                ClientQualityRating = ojl.ClientQualityRating,
                LabourerSafetyRating = ojl.LabourerSafetyRating,
                Labourer = ojl.Labourer,
                Skill = ojl.Skill
            }).ToListAsync();

            if (job == null)
            {
                return NotFound();
            }
            return new ObjectResult(job);
        }

        [HttpGet("{clientId}", Name = "GetJobByClientId")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult<IEnumerable<Job>>> GetJobByClientId(int clientId)
        {
            return await _context.Job.Where(j => j.ClientId == clientId).ToListAsync();
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

        // PUT: api/Job/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutJob(int id, Job job)
        {
            if (id != job.JobId)
            {
                return BadRequest();
            }

            _context.Entry(job).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!JobExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return new ObjectResult(job);
        }

        private bool JobExists(int id)
        {
            return _context.Job.Any(e => e.JobId == id);
        }

    }
}
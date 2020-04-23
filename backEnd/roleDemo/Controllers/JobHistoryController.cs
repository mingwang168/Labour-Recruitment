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
    public class JobHistoryController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public JobHistoryController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/LabourerID
        [HttpGet("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult<IEnumerable<JobHistoryVM>>> GetJobHistorys(int id)
        {
            return await _context.JobLabourer.Where(jl => jl.LabourerId == id).Select(ojl => new JobHistoryVM()
            {
                Job = ojl.Job,
                report = ojl.ClientQualityRating != null ? "Complete" : "Required"
            }).ToListAsync();
        }


        // GET: api/LabourerID
        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetLabourerSafetyRating([FromBody] JobLabourerRating jlr)
        {
            var jobLabourer = _context.JobLabourer.SingleOrDefault(jl => jl.LabourerId == jlr.LabourerId && jl.JobId == jlr.JobId);

            if (jobLabourer != null)
            {
                return  new ObjectResult(jobLabourer.LabourerSafetyRating);
            }
            else
            {
                return NotFound();
            }
        }
   

    // GET: api/LabourerID
    [HttpPut]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> PutClientQualityRating([FromBody] JobLabourerRating jlr)
        {
            var jobLabourer = _context.JobLabourer.SingleOrDefault(jl => jl.LabourerId == jlr.LabourerId && jl.JobId == jlr.JobId);

            if (jobLabourer != null) 
            {
                jobLabourer.ClientQualityRating = jlr.ClientQualityRating;
            }
            else
            {
                return NotFound();
            }

            try
            {
                _context.SaveChanges();
            }
            catch (DbUpdateException)
            {
                throw;
            }
            return new ObjectResult(jobLabourer);
        }
    }

    public class JobLabourerRating
    {
        public int? JobId { get; set; }
        public int? LabourerId { get; set; }
        public double? ClientQualityRating { get; set; }
    }
}
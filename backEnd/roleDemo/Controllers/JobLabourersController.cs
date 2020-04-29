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
    [ApiController]
    public class JobLabourersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public JobLabourersController(ApplicationDbContext context)
        {
            _context = context;
        }

      
        [HttpGet("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetLabourerByJobId(int id)
        {
            List<Labourer> labourers = _context.JobLabourer.Where(jl => jl.JobId == id).Select(ojl => ojl.Labourer).ToList();


            return new ObjectResult(labourers);
        }

    }
}
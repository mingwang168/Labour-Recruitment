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
    public class LabourerProfileController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public LabourerProfileController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<LabourerProfileVM>> GetLabourerProfile(int id)
        {


            return  new LabourerProfileVMRepo(_context).GetLabourer(id);
        }

    }
}
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
    public class LabourerPayrollController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public LabourerPayrollController(ApplicationDbContext context)
        {
            _context = context;
        }


    }
}
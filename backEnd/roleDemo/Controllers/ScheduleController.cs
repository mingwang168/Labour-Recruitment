using System;
using System.Collections.Generic;
using System.Linq;
using labourRecruitment.Models.LabourRecruitment;
using labourRecruitment.Repositories;
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

      
    }

}


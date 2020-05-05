using labourRecruitment.Models.LabourRecruitment;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace labourRecruitment.Services
{
    public class CheckCompletion
    {
        private readonly ApplicationDbContext _context;

        public CheckCompletion(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IActionResult> CheckIfComplete()
        {
            var jobsAreComplete = await _context.Job.Where(j => j.InProgress == true && j.EndDate.ToString("yyyy-MM-dd") == DateTime.Now.ToString("yyyy-MM-dd")).Select(oj => oj).ToListAsync();
            
            if (jobsAreComplete != null)
            {
            foreach (Job job in jobsAreComplete)
                {
                   job.IsComplete = true;
                }
            }
            else
                {
                    return new NoContentResult();
                }
            await _context.SaveChangesAsync();
            return new ObjectResult(jobsAreComplete);
        }

    }
}

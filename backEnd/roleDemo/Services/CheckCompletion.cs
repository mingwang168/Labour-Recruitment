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

        public void CheckComplete()
        {
            var completedJobs = _context.Job.Where(j => j.InProgress == true && j.EndDate.ToString("yyyy-MM-dd") == DateTime.Now.ToString("yyyy-MM-dd")).Select(oj => oj).ToList();


            if (completedJobs != null)
            {
                foreach (Job job in completedJobs)
                {
                   job.IsComplete = true;
                   job.InProgress = false;
                }
            }

            var availableLabourers = _context.JobLabourer.Where(jb => jb.EndDay.CompareTo(DateTime.Now) <= 0).Select(l => l.Labourer).ToList();
           
            //var availableLabourers = completeJobLabourer.ToList();
           
            if (availableLabourers != null) {
                foreach (Labourer l in availableLabourers)
                {
                    l.IsAvailable = true;
                }
            }
      
             _context.SaveChanges();
 
        }

    }
}

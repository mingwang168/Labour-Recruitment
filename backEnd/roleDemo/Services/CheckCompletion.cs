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
            DateTime today = new DateTime(2020, 05, 15);
            var completedJobs = _context.Job.Where(j => j.InProgress == true && j.EndDate.ToString("yyyy-MM-dd") == today.ToString("yyyy-MM-dd")).Select(oj => oj).ToList();


            if (completedJobs != null)
            {
                foreach (Job job in completedJobs)
                {
                   job.IsComplete = true;
                   job.InProgress = false;
                }
            }

            
            var scheduledLabourers = _context.LabourerAttendance.Where(l => l.Date.CompareTo(today) > 0).Select(l => l.Labourer).ToList();
            var labourers = _context.Labourer.ToList();
            var availableLabourers = labourers.Except(scheduledLabourers).ToList();


            if (availableLabourers != null)
            {
                foreach (Labourer l in availableLabourers)
                {
                    l.IsAvailable = true;
                }
            }

            _context.SaveChanges();
 
        }

    }
}

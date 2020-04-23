using labourRecruitment.Models.LabourRecruitment;
using labourRecruitment.ViewModels;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace labourRecruitment.Repositories
{
    public class LabourerProfileVMRepo
    {
        private readonly ApplicationDbContext _context;
        public LabourerProfileVMRepo(ApplicationDbContext context)
        {
            _context = context;
        }

        public LabourerProfileVM GetLabourer(int labourerID)
        {
            Labourer Labourer = _context.Labourer.FirstOrDefault(l => l.LabourerId == labourerID);
            var avgerageSafety = _context.JobLabourer
                  .Where(j => j.LabourerId == labourerID && j.LabourerSafetyRating != null).Average(av => av.LabourerSafetyRating);
            var avgerageQuality = _context.LabourerAttendance
                 .Where(l => l.LabourerId == labourerID && l.DailyQualityRating != null).Average(av => av.DailyQualityRating);
            LabourerProfileVM lp = new LabourerProfileVM()
            {
                Labourer = Labourer,
                Availabilities = _context.AvailabilityLabourer.Where(al => al.LabourerId == labourerID).Select(avl => new Availability()
                {
                    AvailabilityId = avl.Availability.AvailabilityId,
                    AvailabilityDay = avl.Availability.AvailabilityDay
                }),
                AverageSafety = (double)avgerageSafety,
                SafetyRatingNumber = _context.JobLabourer
                  .Where(j => j.LabourerId == labourerID && j.LabourerSafetyRating != null).Count(),
                AverageQuality = (double)avgerageQuality,
                QualityRatingNumber = _context.LabourerAttendance
                 .Where(l => l.LabourerId == labourerID && l.DailyQualityRating != null).Count()
            };
            return lp;
        }
    }
}

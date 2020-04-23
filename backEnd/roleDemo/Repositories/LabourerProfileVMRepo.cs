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

            var avgerageSafety = _context.LabourerSafetyRating
                  .Where(l => l.LabourerId == labourerID && l.Rating != null).Average(av => av.Rating);
            var avgerageQuality = _context.LabourerDailyQualityRating
                 .Where(l => l.LabourerId == labourerID && l.Rating != null).Average(av => av.Rating);
            LabourerProfileVM lp = new LabourerProfileVM()
            {
                Labourer = Labourer,
                Availabilities = _context.AvailabilityLabourer.Where(al => al.LabourerId == labourerID).Select(avl => new Availability()
                {
                    AvailabilityId = avl.Availability.AvailabilityId,
                    AvailabilityDay = avl.Availability.AvailabilityDay
                }),
                AverageSafety = avgerageSafety,
                SafetyRatingNumber = _context.LabourerSafetyRating
                  .Where(l => l.LabourerId == labourerID && l.Rating != null).Count(),
                AverageQuality = avgerageQuality,
                QualityRatingNumber = _context.LabourerDailyQualityRating
                 .Where(l => l.LabourerId == labourerID && l.Rating != null).Count()
            };
            return lp;
        }
    }
}

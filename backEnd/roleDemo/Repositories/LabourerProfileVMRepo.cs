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

        //public IEnumerable<LabourerProfileVM> GetAll()
        //{
        //    return _context.Labourer.Select(l => new LabourerProfileVM()
        //    {
        //        Labourer = l,
        //        Availabilities = l.AvailabilityLabourer,
        //        AverageSafety = l.LabourerSafetyRating
        //    });
        //}

        public LabourerProfileVM GetLabourer(int labourerID)
        {
            Labourer Labourer = _context.Labourer.FirstOrDefault(l => l.LabourerId == labourerID);
            //  List<double> a = new List<double>();
            //    a.Add(3.4d);
            // var a =  _context.LabourerSafetyRating.Where(lsr => lsr.LabourerId == labourerID).Select(l => new List<double>().Add ( l.SafetyRating)).ToList();
            // var b = a;

            //var L = _context.LabourerSafetyRating.Where(lsr => lsr.LabourerId == labourerID).ToList();
            //var sum = 0;
            //foreach (LabourerSafetyRating l in L)
            //{
            //    sum = sum + l.SafetyRating;
            //}

            LabourerProfileVM lp = new LabourerProfileVM()
            {
                Labourer = Labourer,
                Availabilities = _context.AvailabilityLabourer.Where(al => al.LabourerId == labourerID).Select(avl => new Availability()
                {
                    AvailabilityId = avl.Availability.AvailabilityId,
                    AvailabilityDay = avl.Availability.AvailabilityDay
                }),
                AverageSafety = 3.5d
            };
            return lp;
        }
    }
}

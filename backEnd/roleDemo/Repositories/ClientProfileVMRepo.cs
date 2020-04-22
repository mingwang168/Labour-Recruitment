using labourRecruitment.Models.LabourRecruitment;
using labourRecruitment.ViewModels;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace labourRecruitment.Repositories
{
    public class ClientProfileVMRepo
    {
        private readonly ApplicationDbContext _context;
        public ClientProfileVMRepo(ApplicationDbContext context)
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

        public ClientProfileVM GetClient(int clientID)
        {
            Client Client = _context.Client.FirstOrDefault(l => l.ClientId == clientID);
            //  List<double> a = new List<double>();
            //    a.Add(3.4d);
            // var a =  _context.LabourerSafetyRating.Where(lsr => lsr.LabourerId == labourerID).Select(l => new List<double>().Add ( l.SafetyRating)).ToList();
            // var b = a;

            //  var L = _context.LabourerSafetyRating.Where(lsr => lsr.LabourerId == labourerID).ToList();

            //var sum = 0.0d;
            //foreach (LabourerSafetyRating l in L)
            //{
            //    sum = sum + (double)l.Rating;
            //}

            ////var avgerageSafety = _context.LabourerSafetyRating
            ////      .Where(l => l.LabourerId == labourerID && l.Rating != null).Average(av => av.Rating);
            
            var avgerageQuality = _context.ClientQualityRating
                 .Where(l => l.ClientId == clientID && l.Rating != null).Average(av => av.Rating);
            ClientProfileVM lp = new ClientProfileVM()
            {
                Client = Client,
                AverageRating = (double)avgerageQuality
                
            };
            return lp;
        }
    }
}

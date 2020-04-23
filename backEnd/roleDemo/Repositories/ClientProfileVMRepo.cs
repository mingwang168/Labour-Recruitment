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

       
        public ClientProfileVM GetClient(int clientID)
        {
            Client Client = _context.Client.FirstOrDefault(c => c.ClientId == clientID);
            
            
            var avgerageQuality = _context.ClientQualityRating
                 .Where(c => c.ClientId == clientID && c.Rating != null).Average(av => av.Rating);
            ClientProfileVM cp = new ClientProfileVM()
            {
                Client = Client,
                AverageRating = (double)avgerageQuality
                
            };
            return cp;
        }
    }
}

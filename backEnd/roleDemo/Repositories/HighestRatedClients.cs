using labourRecruitment.Models.LabourRecruitment;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static labourRecruitment.Controllers.ClientAssignController;

namespace labourRecruitment.Repositories
{
    public class HighestRatedClients
    {
        private readonly ApplicationDbContext _context;
        public HighestRatedClients(ApplicationDbContext context)
        {
            _context = context;
        }

        public IEnumerable<Client> GetHighestRatingClients()
        {
            List<Client> clients = _context.Job.Where(j => j.InProgress == true && j.ScheduleDone != true).Select(oj => oj.Client).ToList();

            List<ClientAssignVM> clientvms = clients.Select(c => new ClientAssignVM()
            {
                client = c,
                averageRating = 0,

            }).ToList();

            foreach (ClientAssignVM clientvm in clientvms)
            {
                List<JobVM> jobs = _context.Job.Where(j => j.ClientId == clientvm.client.ClientId).Select(oj => new JobVM()
                {
                    job = oj,
                    jobAverageRating = 0,
                }).ToList();
                foreach (JobVM job in jobs)
                {
                    List<JobLabourer> jls = _context.JobLabourer.Where(jl => jl.JobId == job.job.JobId).ToList();
                    job.jobAverageRating = jls.Average(av => av.ClientQualityRating);
                }
                clientvm.averageRating = jobs.Average(avj => avj.jobAverageRating);
            }

            List<Client> clientSorted = clientvms.OrderByDescending(c => c.averageRating).Select(c=>c.client).ToList();
            return clientSorted;

        }
    }
}

using labourRecruitment.Models.LabourRecruitment;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static labourRecruitment.Controllers.ClientAssignController;
using static labourRecruitment.Controllers.LabourerAssignController;

namespace labourRecruitment.Repositories
{
    public class HighestRatedRepo
    {
        private readonly ApplicationDbContext _context;
        public HighestRatedRepo(ApplicationDbContext context)
        {
            _context = context;
        }

        public IEnumerable<Labourer> GetHighestRatedLabourers(int id)
        {
            List<Labourer> availableLabourers = _context.LabourerSkill.Where(ls => ls.SkillId == id).Select(ols => ols.Labourer
                       ).ToList();
            //List<Labourer> labourerScheduled = _context.LabourerAttendance.Where(l => l.Date > today).Select(l => l.Labourer).ToList();
            //List<Labourer> availableLabourers = labourers.Except(labourerScheduled).ToList();

            List<LabourerAssignVM> labourerAss = availableLabourers.Select(l => new LabourerAssignVM()
            {
                labourer = l,
                averageQualityRating = _context.LabourerAttendance.Where(la => la.LabourerId == l.LabourerId).Average(las => las.DailyQualityRating == null ? 0 : las.DailyQualityRating),
                averageSafetyRating = _context.JobLabourer.Where(la => la.LabourerId == l.LabourerId).Average(lss => lss.LabourerSafetyRating == null ? 5 : lss.LabourerSafetyRating),
                averageRating = ((_context.LabourerAttendance.Where(la => la.LabourerId == l.LabourerId).Average(las => las.DailyQualityRating == null ? 0 : las.DailyQualityRating))
                + (_context.JobLabourer.Where(la => la.LabourerId == l.LabourerId).Average(lss => lss.LabourerSafetyRating == null ? 5 : lss.LabourerSafetyRating))) / 2
            }).ToList();

            List<Labourer> labourerSorted = labourerAss.OrderByDescending(la => la.averageRating).Select(la => la.labourer).ToList();
            return labourerSorted;
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

            List<Client> clientSorted = clientvms.OrderByDescending(c => c.averageRating).Select(c=>c.client).Distinct().ToList();
            return clientSorted;

        }
    }
}

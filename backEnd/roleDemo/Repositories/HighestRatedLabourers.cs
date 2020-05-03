using labourRecruitment.Models.LabourRecruitment;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static labourRecruitment.Controllers.LabourerAssignController;

namespace labourRecruitment.Repositories
{
    public class HighestRatedLabourers
    {
        private readonly ApplicationDbContext _context;
        public HighestRatedLabourers(ApplicationDbContext context)
        {
            _context = context;
        }

        public IEnumerable<Labourer> GetHighestRatedLabourersAsync(int id)
        {
            DateTime today = new DateTime();
            List<Labourer> labourers = _context.LabourerSkill.Where(ls => ls.SkillId == 6).Select(ols => ols.Labourer
                       ).Where(l => l.IsAvailable == true).ToList();
            List<Labourer> labourerScheduled = _context.LabourerAttendance.Where(l => l.Date > today).Select(l => l.Labourer).ToList();
            List<Labourer> availableLabourers = labourers.Except(labourerScheduled).ToList();

            List<LabourerAssignVM> labourerAss = availableLabourers.Select(l => new LabourerAssignVM()
            {
                labourer = l,
                averageQualityRating = _context.LabourerAttendance.Where(la => la.LabourerId == l.LabourerId).Average(las => las.DailyQualityRating == null ? 0 : las.DailyQualityRating),
                averageSafetyRating = _context.JobLabourer.Where(la => la.LabourerId == l.LabourerId).Average(lss => lss.LabourerSafetyRating == null ? 5 : lss.LabourerSafetyRating),
                averageRating = ((_context.LabourerAttendance.Where(la => la.LabourerId == l.LabourerId).Average(las => las.DailyQualityRating == null ? 0 : las.DailyQualityRating))
                + (_context.JobLabourer.Where(la => la.LabourerId == l.LabourerId).Average(lss => lss.LabourerSafetyRating == null ? 5 : lss.LabourerSafetyRating))) / 2
            }).ToList();

            List<Labourer> labourerSorted = labourerAss.OrderByDescending(la => la.averageRating).Select(la=>la.labourer).ToList();
            return labourerSorted;
        }
    }
}

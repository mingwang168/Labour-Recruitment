using labourRecruitment.Models.LabourRecruitment;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace labourRecruitment.Repositories
{
    public class HighestRatedLabourers
    {
        private readonly ApplicationDbContext _context;
        public HighestRatedLabourers(ApplicationDbContext context)
        {
            _context = context;
        }

        public IEnumerable<Labourer> GetHighestRatedLabourers (int id)
        {
            return  _context.LabourerSkill.Where(ls => ls.SkillId == id).Select(ols => ols.Labourer
                        ).Where(l => l.IsAvailable == true).ToList();
        }
    }
}

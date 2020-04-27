using labourRecruitment.Models.LabourRecruitment;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace labourRecruitment.ViewModels
{
    public class JobVM
    {
        public int JobSkillId { get; set; }
        public int? JobId { get; set; }
        public int? SkillId { get; set; }
        public int? NumberNeeded { get; set; }

        public virtual Job Job { get; set; }
        public virtual Skill Skill { get; set; }

    }
}

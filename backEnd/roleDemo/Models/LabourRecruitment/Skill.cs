using System;
using System.Collections.Generic;

namespace labourRecruitment.Models.LabourRecruitment
{
    public partial class Skill
    {
        public Skill()
        {
            JobSkill = new HashSet<JobSkill>();
            LabourerSkill = new HashSet<LabourerSkill>();
        }

        public int SkillId { get; set; }
        public string SkillName { get; set; }
        public decimal? PayRate { get; set; }

        public virtual ICollection<JobSkill> JobSkill { get; set; }
        public virtual ICollection<LabourerSkill> LabourerSkill { get; set; }
    }
}

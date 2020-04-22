using labourRecruitment.Models.LabourRecruitment;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace labourRecruitment.ViewModels
{
    public class JobSkillVM
    {
        public Job Job { get; set; }
        public IEnumerable<JobSkill> JobSkills { get; set; }
    }
}

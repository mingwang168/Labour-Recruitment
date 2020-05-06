using labourRecruitment.Models.LabourRecruitment;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace labourRecruitment.ViewModels
{
    public class IncidentDetailVM
    {
        public IncidentReport IncidentReport { get; set; }
        public IEnumerable<JobLabourer> JobLabourers { get; set; }
    }
}

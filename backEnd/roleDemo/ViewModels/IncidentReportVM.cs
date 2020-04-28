using labourRecruitment.Models.LabourRecruitment;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace labourRecruitment.ViewModels
{
    public class IncidentReportVM
    {
        public IncidentReport IncidentReport { get; set; }
        public IEnumerable<LabourerIncidentReport> LabourerReports { get; set; }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace labourRecruitment.ViewModels
{
    public class IncidentVM
    {
        public int? IncidentReportId { get; set; }
        public DateTime? IncidentReportDate { get; set; }
        public string IncidentType { get; set; }
        public string JobTitle { get; set; }
    }
}

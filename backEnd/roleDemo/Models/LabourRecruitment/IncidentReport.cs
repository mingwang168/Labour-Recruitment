using System;
using System.Collections.Generic;

namespace labourRecruitment.Models.LabourRecruitment
{
    public partial class IncidentReport
    {
        public IncidentReport()
        {
            IncidentReportDetail = new HashSet<IncidentReportDetail>();
        }

        public int IncidentReportId { get; set; }
        public int? IncidentTypeId { get; set; }
        public DateTime? IncidentReportDate { get; set; }
        public string IncidentReportDescription { get; set; }
        public string IncidentReportFile { get; set; }

        public virtual IncidentType IncidentType { get; set; }
        public virtual ICollection<IncidentReportDetail> IncidentReportDetail { get; set; }
    }
}

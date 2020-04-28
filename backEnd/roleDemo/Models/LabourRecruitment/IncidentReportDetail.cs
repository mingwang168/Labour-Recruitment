using System;
using System.Collections.Generic;

namespace labourRecruitment.Models.LabourRecruitment
{
    public partial class IncidentReportDetail
    {
        public int IncidentReportDetailId { get; set; }
        public int? JobLabourerId { get; set; }
        public int? IncidentReportId { get; set; }

        public virtual IncidentReport IncidentReport { get; set; }
        public virtual JobLabourer JobLabourer { get; set; }
    }
}

using System;
using System.Collections.Generic;

namespace labourRecruitment.Models.LabourRecruitment
{
    public partial class Incident
    {
        public int IncidentId { get; set; }
        public int? JobId { get; set; }
        public int? LabourerId { get; set; }
        public int? IncidentTypeId { get; set; }
        public DateTime? IncidentDate { get; set; }
        public string IncidentDescription { get; set; }
        public string IncidentFile { get; set; }

        public virtual IncidentType IncidentType { get; set; }
        public virtual Job Job { get; set; }
        public virtual Labourer Labourer { get; set; }
    }
}

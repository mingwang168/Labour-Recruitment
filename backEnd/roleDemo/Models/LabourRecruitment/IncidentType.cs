using System;
using System.Collections.Generic;

namespace labourRecruitment.Models.LabourRecruitment
{
    public partial class IncidentType
    {
        public IncidentType()
        {
            Incident = new HashSet<Incident>();
        }

        public int IncidentTypeId { get; set; }
        public string IncidentTypeName { get; set; }

        public virtual ICollection<Incident> Incident { get; set; }
    }
}

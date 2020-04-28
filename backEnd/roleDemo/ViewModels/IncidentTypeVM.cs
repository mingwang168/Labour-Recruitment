using labourRecruitment.Models.LabourRecruitment;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace labourRecruitment.ViewModels
{
    public class IncidentTypeVM
    {
        //public Incident Incident { get; set; }
        public IEnumerable<IncidentType> IncidentTypes { get; set; }

    }
}
using labourRecruitment.Models.LabourRecruitment;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace labourRecruitment.ViewModels
{
    public class IncidentVM
    {
        public int IncidentId { get; set; }
        public int? JobId { get; set; }
        public int? LabourerId { get; set; }
        public int? IncidentTypeId { get; set; }
        public DateTime? IncidentDate { get; set; }
        public string IncidentDescription { get; set; }
        public string IncidentFile { get; set; }

    }
}
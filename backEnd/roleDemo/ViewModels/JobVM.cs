using labourRecruitment.Models.LabourRecruitment;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace labourRecruitment.ViewModels
{
    public class JobVM
    {
        public int JobId { get; set; }
        public string Title { get; set; }
        public string JobDescription { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public bool? InProgress { get; set; }
        public bool? IsComplete { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string ClientName { get; set; }
    }
}

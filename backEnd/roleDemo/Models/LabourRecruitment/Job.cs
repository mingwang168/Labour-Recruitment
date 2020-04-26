using System;
using System.Collections.Generic;

namespace labourRecruitment.Models.LabourRecruitment
{
    public partial class Job
    {
        public Job()
        {
            Incident = new HashSet<Incident>();
            JobLabourer = new HashSet<JobLabourer>();
            JobSkill = new HashSet<JobSkill>();
            LabourerAttendance = new HashSet<LabourerAttendance>();
        }

        public int JobId { get; set; }
        public int? ClientId { get; set; }
        public string Title { get; set; }
        public string JobDescription { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public bool? InProgress { get; set; }
        public bool? IsComplete { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string PostalCode { get; set; }
        public int? TotalHired { get; set; }

        public virtual Client Client { get; set; }
        public virtual ICollection<Incident> Incident { get; set; }
        public virtual ICollection<JobLabourer> JobLabourer { get; set; }
        public virtual ICollection<JobSkill> JobSkill { get; set; }
        public virtual ICollection<LabourerAttendance> LabourerAttendance { get; set; }
    }
}

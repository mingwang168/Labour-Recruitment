using System;
using System.Collections.Generic;

namespace labourRecruitment.Models.LabourRecruitment
{
    public partial class JobLabourer
    {
        public int JobLabourerId { get; set; }
        public int? JobId { get; set; }
        public int? LabourerId { get; set; }
        public double? ClientQualityRating { get; set; }
        public double? LabourerSafetyRating { get; set; }

        public virtual Job Job { get; set; }
        public virtual Labourer Labourer { get; set; }
    }
}

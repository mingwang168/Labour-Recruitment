using System;
using System.Collections.Generic;

namespace labourRecruitment.Models.LabourRecruitment
{
    public partial class LabourerSafetyRating
    {
        public int SafetyRating { get; set; }
        public int? JobId { get; set; }
        public int? LabourerId { get; set; }
        public double? Rating { get; set; }

        public virtual Job Job { get; set; }
        public virtual Labourer Labourer { get; set; }
    }
}

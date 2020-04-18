using System;
using System.Collections.Generic;

namespace labourRecruitment.Models.LabourRecruitment
{
    public partial class LabourerDailyQualityRating
    {
        public int DailyQualityRating { get; set; }
        public int? JobId { get; set; }
        public int? LabourerId { get; set; }
        public double? Rating { get; set; }
        public DateTime? RatingDate { get; set; }

        public virtual Job Job { get; set; }
        public virtual Labourer Labourer { get; set; }
    }
}

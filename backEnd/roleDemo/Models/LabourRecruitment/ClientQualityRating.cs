using System;
using System.Collections.Generic;

namespace labourRecruitment.Models.LabourRecruitment
{
    public partial class ClientQualityRating
    {
        public int QualityRating { get; set; }
        public int? JobId { get; set; }
        public int? ClientId { get; set; }
        public double? Rating { get; set; }

        public virtual Client Client { get; set; }
        public virtual Job Job { get; set; }
    }
}

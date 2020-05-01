using labourRecruitment.Models.LabourRecruitment;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace labourRecruitment.Repositories
{
    public class ScheduleRepo
    {
        private readonly ApplicationDbContext _context;
        public ScheduleRepo(ApplicationDbContext context)
        {
            _context = context;
        }
        public static int GetBusinessDays(DateTime startD, DateTime endD)
        {
            int calcBusinessDays = Convert.ToInt32(
                1 + ((endD - startD).TotalDays * 5 -
                (startD.DayOfWeek - endD.DayOfWeek) * 2) / 7);

            if (endD.DayOfWeek == DayOfWeek.Saturday) calcBusinessDays--;
            if (startD.DayOfWeek == DayOfWeek.Sunday) calcBusinessDays--;

            return calcBusinessDays;
        }

        public void PopulateLabourerAttendance(int jobId, int labourerId, DateTime sDate, DateTime eDate)
        {
            DateTime i = sDate;
           
            while (DateTime.Compare(i,eDate) <= 0)
            {
                if (i.DayOfWeek == DayOfWeek.Sunday || i.DayOfWeek == DayOfWeek.Saturday)
                {
                    i = i.AddDays(1);
                }
                else
                {
                    _context.LabourerAttendance.Add(new LabourerAttendance
                    {
                        JobId = jobId,
                        LabourerId = labourerId,
                        DailyQualityRating = 0,
                        Date = i

                    });
                    _context.SaveChanges();
                    i = i.AddDays(1);
                }
            }
        } 


    }
}

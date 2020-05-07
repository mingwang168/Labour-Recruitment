﻿using labourRecruitment.Models.LabourRecruitment;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace labourRecruitment.Services
{
    public class ScheduleHelper
    {
        private readonly ApplicationDbContext _context;
        public ScheduleHelper(ApplicationDbContext context)
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

            while (DateTime.Compare(i, eDate) <= 0)
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

        public static int CalculateLastDay(DateTime startDay)
        {
            int dayofWeek = (int)startDay.DayOfWeek;
            return (6 - dayofWeek) + 6;
        }

        public void AddLabourersToFirstSchedule(int jobId)
        {
            var jobSelected = _context.Job.Where(j => j.JobId == jobId).FirstOrDefault();
            var jobSkillSelected = _context.Job.Where(j => j.JobId == jobId).Select(j => j.JobSkill).FirstOrDefault();
            var duration = (jobSelected.EndDate - jobSelected.StartDate).TotalDays;
            DateTime eDate;
            if (duration <= 14)
            {
                eDate = jobSelected.EndDate;
                jobSelected.ScheduleDone = true;
            }
            else
            {
                eDate = jobSelected.StartDate.AddDays(ScheduleHelper.CalculateLastDay(jobSelected.StartDate));
            }

            GetHighestRated rated = new GetHighestRated(_context);
            foreach (JobSkill js in jobSkillSelected)
            {
                var ratedLabourers = rated.GetHighestRatedLabourers(js.SkillId).Where(l => l.IsAvailable == true && l.OnLeave == false).ToList();
                List<Labourer> labourers = new List<Labourer>();
                labourers.AddRange(ratedLabourers.GetRange(0, js.NumberNeeded));

                foreach (Labourer labourer in labourers)
                {
                    _context.JobLabourer.Add(new JobLabourer
                    {
                        JobId = jobId,
                        SkillId = js.SkillId,
                        LabourerId = labourer.LabourerId,
                        LabourerSafetyRating = 5,
                        SafetyMeetingCompleted = false,
                        ClientQualityRating = 0,
                        StartDay = jobSelected.StartDate,
                        EndDay = eDate,
                        Duration = GetBusinessDays(jobSelected.StartDate, eDate)
                    });
                    PopulateLabourerAttendance(jobId, labourer.LabourerId, jobSelected.StartDate, eDate);
                    labourer.IsAvailable = false;
                }
                _context.SaveChanges();

            }

        }

        public void AddWeeklySchedule()
        {
            GetHighestRated rated = new GetHighestRated(_context);
            var ratedClients = rated.GetHighestRatingClients();

            //Later we should change it to now 
            DateTime today = new DateTime(2020, 5, 8);
            foreach (Client client in ratedClients)
            {
                var jobs = _context.Job.Where(j => j.ClientId == client.ClientId && j.ScheduleDone != true).ToList();
                foreach (Job j in jobs)
                {
                    var jobSkills = _context.JobSkill.Where(js => js.JobId == j.JobId).ToList();

                    foreach (JobSkill js in jobSkills)
                    {
                        var ratedLabourers = rated.GetHighestRatedLabourers(js.SkillId).ToList();
                        var unAvailableLabourers = _context.JobLabourer.Where(jb => jb.StartDay > today.AddDays(9)).Select(l => l.Labourer)
                            .Distinct().Where(l=>l.OnLeave == true).ToList();
                        var availableLabourers = ratedLabourers.Except(unAvailableLabourers).ToList();
                        List<Labourer> chosenLabourers = new List<Labourer>();
                        chosenLabourers.AddRange(availableLabourers.GetRange(0, js.NumberNeeded));
                        foreach (Labourer l in chosenLabourers)
                        {
                            var jobLabourer = _context.JobLabourer.Where(jl => jl.JobId == j.JobId && jl.LabourerId == l.LabourerId).FirstOrDefault();
                            DateTime sDate = today.AddDays(10);
                            DateTime eDate = j.EndDate > today.AddDays(15) ? today.AddDays(15) : j.EndDate;
                            if (jobLabourer == null)
                            {
                                _context.Add(new JobLabourer
                                {
                                    JobId = j.JobId,
                                    SkillId = js.SkillId,
                                    LabourerId = l.LabourerId,
                                    LabourerSafetyRating = 5,
                                    SafetyMeetingCompleted = false,
                                    ClientQualityRating = 0,
                                    StartDay = sDate,
                                    EndDay = eDate,
                                    Duration = GetBusinessDays(sDate, eDate)
                                });
                            }
                            else
                            {
                                _context.Add(new JobLabourer
                                {
                                    JobId = j.JobId,
                                    SkillId = js.SkillId,
                                    LabourerId = l.LabourerId,
                                    LabourerSafetyRating = jobLabourer.LabourerSafetyRating,
                                    SafetyMeetingCompleted = jobLabourer.SafetyMeetingCompleted,
                                    ClientQualityRating = jobLabourer.ClientQualityRating,
                                    StartDay = sDate,
                                    EndDay = eDate,
                                    Duration = GetBusinessDays(sDate, eDate)
                                });

                            }
                            PopulateLabourerAttendance(j.JobId, l.LabourerId, sDate, eDate);
                            l.IsAvailable = false;
                            _context.SaveChanges();
                        };
                    };

                };

            }
        }

    }
}

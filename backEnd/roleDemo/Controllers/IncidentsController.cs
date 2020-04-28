using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using labourRecruitment.Models.LabourRecruitment;
using labourRecruitment.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace labourRecruitment.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IncidentsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public IncidentsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Incidents
        [HttpGet]
        public async Task<ActionResult<IEnumerable<IncidentReport>>> GetIncident()
        {
            var reports = await _context.IncidentReport.ToListAsync();
            foreach (IncidentReport report in reports)
            {
                report.LabourerIncidentReport = _context.LabourerIncidentReport.Where(lr => lr.IncidentReportId == report.IncidentReportId).
                    Select(r => new LabourerIncidentReport
                    {
                        Labourer = r.Labourer
                    }).ToList();

                report.IncidentType = _context.IncidentType.Where(i => i.IncidentTypeId == report.IncidentTypeId).Select(i=> new IncidentType
                {
                    IncidentTypeName = i.IncidentTypeName
                }).FirstOrDefault();
                report.Job = _context.Job.Where(j => j.JobId == report.JobId).Select(j => new Job
                {
                    Title = j.Title
                }).FirstOrDefault();
            }
            return reports;
        }

        // GET: api/Incidents/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IncidentReport>> GetIncident(int id)
        {
            var incident = await _context.IncidentReport.FindAsync(id);

            if (incident == null)
            {
                return NotFound();
            }

            incident.Job = _context.Job.Where(j => j.JobId == incident.JobId).Select(j => new Job
            {
                Title = j.Title
            }).FirstOrDefault();
            incident.IncidentType = _context.IncidentType.Where(i => i.IncidentTypeId == incident.IncidentTypeId).Select(i => new IncidentType
            {
                IncidentTypeName = i.IncidentTypeName
            }).FirstOrDefault();
            incident.LabourerIncidentReport = _context.LabourerIncidentReport.Where(l => l.IncidentReportId == incident.IncidentReportId).
                Select(l => new LabourerIncidentReport
                {
                    Labourer = l.Labourer
                }).ToList();

            return incident;
        }

        
        //// POST: api/Incidents
        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult PostIncident(IncidentReportVM report)
        {
            _context.IncidentReport.Add(report.IncidentReport);

            foreach (LabourerIncidentReport labourerReport in report.LabourerReports)
            {
                labourerReport.IncidentReportId = report.IncidentReport.IncidentReportId;
                _context.LabourerIncidentReport.Add(labourerReport);

            }
            _context.SaveChanges();
            return new ObjectResult(report);
        }


        
    }
}
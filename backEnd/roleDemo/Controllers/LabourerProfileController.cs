using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using labourRecruitment.Models.LabourRecruitment;
using labourRecruitment.Repositories;
using labourRecruitment.ViewModels;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace labourRecruitment.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LabourerProfileController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public LabourerProfileController(ApplicationDbContext context)
        {
            _context = context;
        }

        //[HttpGet("{id}")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        //public async Task<ActionResult<LabourerProfileVM>> GetLabourerProfile(int id)
        //{
        //    return  new LabourerProfileVMRepo(_context).GetLabourer(id);
        //}

        [HttpPut("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> PutLabourerProfile(LabourerProfileVM labourerProfile)
        {
            var lp = _context.Labourer.SingleOrDefault(l => l.LabourerId == labourerProfile.Labourer.LabourerId);

            if (lp == null)
            {
                return NotFound();
            }
            else
            {
                lp.LabourerFirstName = labourerProfile.Labourer.LabourerFirstName;
                lp.LabourerLastName = labourerProfile.Labourer.LabourerLastName;
                lp.IsAvailable = labourerProfile.Labourer.IsAvailable;
                lp.LabourerEmail = labourerProfile.Labourer.LabourerEmail;
             }


            _context.AvailabilityLabourer.RemoveRange(_context.AvailabilityLabourer.Where(al => al.LabourerId == labourerProfile.Labourer.LabourerId));

            foreach (string day in labourerProfile.Availabilities.Select(av=> av.AvailabilityDay))
            {
                Availability availability = _context.Availability.Where(a => a.AvailabilityDay == day).FirstOrDefault();
                if (availability != null)
                {
                    AvailabilityLabourer availabilityLabourer = new AvailabilityLabourer
                    {
                        AvailabilityId = availability.AvailabilityId,
                        LabourerId = labourerProfile.Labourer.LabourerId
                    };
                    _context.AvailabilityLabourer.Add(availabilityLabourer);
                    _context.SaveChanges();
                }
                else
                {
                    return NotFound();
                }

            }

            try
            {
                _context.SaveChanges();
            }
            catch (DbUpdateException)
            {
                throw;
            }
            return NoContent();
        }

        // DELETE: api/Todo?id=5
        [HttpDelete]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> DeleteLabourerProfile(int id)
        {


            var lb = await _context.Labourer.FindAsync(id);
            if (lb == null)
            {
                return NotFound();
            }

            _context.Labourer.Remove(lb);
            await _context.SaveChangesAsync();
            return new ObjectResult(lb);

        }




    }
}
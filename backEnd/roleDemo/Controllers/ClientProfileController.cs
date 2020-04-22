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
    public class ClientProfileController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ClientProfileController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult<ClientProfileVM>> GetLClientProfile(int id)
        {
            return  new ClientProfileVMRepo(_context).GetClient(id);
        }

        [HttpPut("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> PutClientProfile(ClientProfileVM clientProfile)
        {
            var lp = _context.Client.SingleOrDefault(l => l.ClientId == clientProfile.Client.ClientId);

            if (lp == null)
            {
                return NotFound();
            }
            else
            {
                lp.ClientName = clientProfile.Client.ClientName;               
             
                lp.ClientEmail = clientProfile.Client.ClientEmail;
             }


            //_context.AvailabilityLabourer.RemoveRange(_context.AvailabilityLabourer.Where(al => al.LabourerId == labourerProfile.Labourer.LabourerId));

            //foreach (string day in labourerProfile.Availabilities.Select(av=> av.AvailabilityDay))
            //{
            //    Availability availability = _context.Availability.Where(a => a.AvailabilityDay == day).FirstOrDefault();
            //    if (availability != null)
            //    {
            //        AvailabilityLabourer availabilityLabourer = new AvailabilityLabourer
            //        {
            //            AvailabilityId = availability.AvailabilityId,
            //            LabourerId = labourerProfile.Labourer.LabourerId
            //        };
            //        _context.AvailabilityLabourer.Add(availabilityLabourer);
            //        _context.SaveChanges();
            //    }
            //    else
            //    {
            //        return NotFound();
            //    }

            //}

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

        // DELETE: api/

        [HttpDelete]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> DeleteClientProfile(int id)
        {


            var lb = await _context.Client.FindAsync(id);
            if (lb == null)
            {
                return NotFound();
            }

            _context.Client.Remove(lb);
            await _context.SaveChangesAsync();
            return new ObjectResult(lb);

        }




    }
}
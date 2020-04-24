using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using labourRecruitment.Models.LabourRecruitment;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace labourRecruitment.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LabourersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public LabourersController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Labourers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Labourer>>> GetLabourer()
        {
            return await _context.Labourer.ToListAsync();
        }

        // GET: api/Labourers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Labourer>> GetLabourer(int id)
        {
            var labourer = await _context.Labourer.FindAsync(id);

            if (labourer == null)
            {
                return NotFound();
            }

            return labourer;
        }

        // PUT: api/Labourers/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLabourer(int id, Labourer labourer)
        {
            if (id != labourer.LabourerId)
            {
                return BadRequest();
            }

            _context.Entry(labourer).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LabourerExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Labourers
        [HttpPost]
        public async Task<ActionResult<Labourer>> PostLabourer(Labourer labourer)
        {
            _context.Labourer.Add(labourer);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetLabourer", new { id = labourer.LabourerId }, labourer);
        }

        // DELETE: api/Labourers/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Labourer>> DeleteLabourer(int id)
        {
            var labourer = await _context.Labourer.FindAsync(id);
            if (labourer == null)
            {
                return NotFound();
            }

            _context.Labourer.Remove(labourer);
            await _context.SaveChangesAsync();

            return labourer;
        }

        private bool LabourerExists(int id)
        {
            return _context.Labourer.Any(e => e.LabourerId == id);
        }
    }
}

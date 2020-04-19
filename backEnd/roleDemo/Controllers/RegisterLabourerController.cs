using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper.Configuration;
using labourRecruitment.Models.LabourRecruitment;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using roleDemo.ViewModels;

namespace roleDemo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegisterLabourerController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly ApplicationDbContext _context;

        public RegisterLabourerController(
                UserManager<IdentityUser> userManager,
                ApplicationDbContext context,
                IConfiguration config)
        {
            _userManager = userManager;
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> OnPostAsync([FromBody]LabourerRegisterVM input)
        {
            var user = new IdentityUser { UserName = input.User.Email.ToLower(), Email = input.User.Email };
            var result = await _userManager.CreateAsync(user, input.User.Password);
            var errorList = new List<string>();

            if (result.Succeeded)
            {
                SystemUser sysUser = new SystemUser()
                {
                    Email = input.User.Email,
                    Role = input.User.Role
                };

                Labourer labourer = new Labourer
                {
                    LabourerFirstName = input.Labourer.LabourerFirstName,
                    LabourerLastName = input.Labourer.LabourerLastName,
                    LabourerSin = input.Labourer.LabourerSin,
                    LabourerEmail = input.User.Email,
                    IsAvailable = true,
                };
                _context.SystemUser.Add(sysUser);
                sysUser.Labourer.Add(labourer);
                _context.SaveChanges();

                foreach (string day in input.AvailableDays)
                {
                    Availability availability = _context.Availability.Where(a => a.AvailabilityDay == day).FirstOrDefault();
                    if (availability != null)
                    {
                        AvailabilityLabourer availabilityLabourer = new AvailabilityLabourer
                        {
                            AvailabilityId = availability.AvailabilityId,
                            LabourerId = labourer.LabourerId
                        };
                        _context.AvailabilityLabourer.Add(availabilityLabourer);
                        _context.SaveChanges();
                    }
                    else
                    {
                        await _userManager.DeleteAsync(user);
                        _context.Labourer.Remove(labourer);
                        _context.SystemUser.Remove(sysUser);
                        _context.SaveChanges();
                        return BadRequest(new { status = 400, errors = "Available day is not valid" });
                    }

                }

                foreach (int skillId in input.SkillIds)
                {
                    LabourerSkill labourerSkill = new LabourerSkill
                    {
                        SkillId = skillId,
                        LabourerId = labourer.LabourerId
                    };
                    _context.LabourerSkill.Add(labourerSkill);
                    _context.SaveChanges();

                }

                return Ok(new { status = 200, title = "Registered successfully." });
            }

            foreach (IdentityError error in result.Errors)
            {
                errorList.Add(error.Description);
            }

            return BadRequest(new { status = 400, errors = errorList });
        }

    }

}
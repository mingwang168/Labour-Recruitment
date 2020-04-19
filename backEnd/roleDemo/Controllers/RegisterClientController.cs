using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using labourRecruitment.Models.LabourRecruitment;
using labourRecruitment.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace labourRecruitment.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegisterClientController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly ApplicationDbContext _context;

        public RegisterClientController(
                UserManager<IdentityUser> userManager,
                ApplicationDbContext context)
        {
            _userManager = userManager;
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> OnPostAsync([FromBody]ClientRegisterVM input)
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

                Client client = new Client
                {
                    ClientName = input.Client.ClientName,
                    ClientEmail = input.Client.ClientEmail,
                    ClientPhoneNumber = input.Client.ClientPhoneNumber,
                    ClientCity = input.Client.ClientCity,
                    ClientState = input.Client.ClientState,
                    ClientDescription = input.Client.ClientDescription
                };
                _context.SystemUser.Add(sysUser);
                sysUser.Client.Add(client);
                _context.SaveChanges();
                
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
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using labourRecruitment.Models.LabourRecruitment;
using labourRecruitment.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using roleDemo.Models;

namespace roleDemo.Controllers {
    public class HomeController : Controller {

        private readonly EmailSettings _emailSettings;

        public HomeController(IOptions<EmailSettings> emailSettings)
        {
            _emailSettings = emailSettings.Value;
        }

        public IActionResult Index() {
            return View();
        }

        public IActionResult Privacy() {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error() {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        public IActionResult Contact()
        {
            EmailContent emailContent = new EmailContent
            {
                LabourerFirstName = "Ming",
                LabourerLastName = "Wang",
                JobAddress = "BCIT downtown campus",
                JobStart = Convert.ToDateTime("2020-05-15 00:00:00"),
                JobEnd = Convert.ToDateTime("2020-05-20 00:00:00")
            };
            if (new EmailHelper(_emailSettings).SendMail("minghuiwang0904@gmail.com", "Your Job Schedule", emailContent))
                return RedirectToAction("Index");
            return RedirectToAction("Error");
        }


    }
}

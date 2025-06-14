using Microsoft.AspNetCore.Mvc;


namespace Gozef.Controllers
{

    public class AboutController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}

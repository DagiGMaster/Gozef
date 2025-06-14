using Microsoft.AspNetCore.Mvc;

namespace Gozef.Controllers
{
    public class BlogController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}

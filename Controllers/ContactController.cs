﻿using Microsoft.AspNetCore.Mvc;

namespace Gozef.Controllers
{
    public class ContactController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}

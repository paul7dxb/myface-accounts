using Microsoft.AspNetCore.Mvc;
using MyFace.Models.Request;
using MyFace.Models.Response;
using MyFace.Repositories;
using MyFace.Helpers;
using System;

namespace MyFace.Controllers
{
    [ApiController]
    [Route("/login")]
    public class LoginController : ControllerBase
    {
        private readonly IUsersRepo _users;
        private readonly IAuthHelper _authHelper;

        public LoginController(IUsersRepo users, IAuthHelper authHelper)
        {
            _users = users;
            _authHelper = authHelper;
        }

        [HttpPost("")]
        public IActionResult Login()
        {
            var isAuthenticated = _authHelper.IsAuthenticated(Request);
            var isAuth = isAuthenticated.Item1;
            var isAuthResponse = isAuthenticated.Item2;

            if (isAuth)
            {   
                
                return Ok();
            }
            else
            {
                Console.WriteLine($"UserId: {isAuthResponse} Not Logged In!");
                return Unauthorized();
            }

          
        }
    }


}
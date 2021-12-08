using KURSOVOI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Ubiety.Dns.Core;

namespace KURSOVOI.Controllers
{
    [Route("[controller]")]
    public class AccountController : Controller
    {
        tricksContext db;
        private IConfiguration _config;
        User person;


        public AccountController(tricksContext context, IConfiguration config)
        {
            db = context;
            _config = config;
        }

        public IActionResult Index()
        {
            return Ok(db.Users.ToArray());
        }


        [HttpGet("zxc")]
        [Authorize(Roles = "admin")]
        public IActionResult qwe()
        {
            return Ok(new
            {
                qwe = "qwe"
            });
        }

        [HttpPost("insertPhoto")]
        [Authorize(Roles = "user")]
        public IActionResult insertPhoto(string urlPhoto, string login)
        {
            User user = db.Users.ToList().Find(options => options.Login == login);
            Infoaboutuser iaUser = db.Infoaboutusers.ToList().Find(options => options.IdUser == user.Id);
            if (iaUser == null)
            {
                Infoaboutuser infoaboutuser = new Infoaboutuser();
                infoaboutuser.IdUser = user.Id;
                infoaboutuser.Photo = urlPhoto;
                db.Infoaboutusers.Add(infoaboutuser);
                db.SaveChanges();

            }
            else
            {
                iaUser.Photo = urlPhoto;
                db.Infoaboutusers.Update(iaUser);
                db.SaveChanges();
            }

            return Ok(new
            {
                login = user.Login
            }
              );
        }

        [HttpGet("getPhoto")]
        [Authorize]
        public IActionResult getPhoto(string login)
        {
            User user = db.Users.ToList().Find(options => options.Login == login);
            Infoaboutuser infoaboutuser = db.Infoaboutusers.ToList().Find(oprtions => oprtions.IdUser == user.Id);
            if (infoaboutuser != null)
            {
                if (infoaboutuser.Email != null)
                {
                    return Ok(new
                    {
                        id = user.Id,
                        login = login,
                        password = user.Password,
                        role = user.Role,
                        email = infoaboutuser.Email,
                        url = infoaboutuser.Photo
                    }
            );
                }
                else
                {
                    return Ok(new
                    {
                        id = user.Id,
                        login = login,
                        password = user.Password,
                        role = user.Role,
                        email = "null",
                        url = infoaboutuser.Photo
                    }
            );
                }

            }
            return Ok(new
            {
                id = user.Id,
                login = login,
                password = user.Password,
                role = person.Role,
                email = "null",
                url = "null"
            }
             );

        }

        [HttpPost("insertEmail")]
        [Authorize]
        public IActionResult insertEmail(string login, string email)
        {
            User user = db.Users.ToList().Find(options => options.Login == login);
            Infoaboutuser iaUser = db.Infoaboutusers.ToList().Find(options => options.IdUser == user.Id);
            if (iaUser == null)
            {
                iaUser = new Infoaboutuser();
                iaUser.IdUser = user.Id;
                iaUser.Email = email;
                db.Infoaboutusers.Add(iaUser);
                db.SaveChanges();

            }
            else
            {
                iaUser.Email = email;
                db.Infoaboutusers.Update(iaUser);
                db.SaveChanges();
            }
            if (iaUser.Photo != null)
            {
                return Ok(new
                {
                    id= user.Id,
                    login = login,
                    password = user.Password,
                    role = user.Role,
                    email = iaUser.Email,
                    url = iaUser.Photo
                });
            }
            else
            {
                return Ok(new
                {
                    id = user.Id,
                    login = login,
                    password = user.Password,
                    role = user.Role,
                    email = iaUser.Email,
                    url = "null"
                });
            }
        }

        [HttpGet("getacc")]
        [Authorize]
        public IActionResult getAcc()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            IEnumerable<Claim> claims = identity.Claims;

            return Ok(claims);

        }

        [HttpPost("login")]
        public IActionResult Token(string login, string password)
        {
            var identity = GetIdentity(login, password);
            person = db.Users.FirstOrDefault(x => x.Login == login && x.Password == password);
            Infoaboutuser infoaboutuser = db.Infoaboutusers.ToList().Find(options => options.IdUser == person.Id);
            if (identity == null)
            {
                return BadRequest(new { errorText = "Invalid username or password." });
            }

            var now = DateTime.UtcNow;
            // создаем JWT-токен
            var jwt = new JwtSecurityToken(
                    issuer: AuthOptions.ISSUER,
                    audience: AuthOptions.AUDIENCE,
                    notBefore: now,
                    claims: identity.Claims,
                    expires: now.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
                    signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            if (infoaboutuser != null)
            {
                return Ok(new
                {
                    id = person.Id,
                    login = login,
                    password = password,
                    token = encodedJwt,
                    role = person.Role,
                    email = infoaboutuser.Email,
                    url = infoaboutuser.Photo
                });
            }
            return Ok(new
            {
                id = person.Id,
                login = login,
                password = password,
                token = encodedJwt,
                role = person.Role,
                email = "null",
                url = "null"
            });
        }

        private ClaimsIdentity GetIdentity(string username, string password)
        {
            person = db.Users.FirstOrDefault(x => x.Login == username && x.Password == password);
            if (person != null)
            {
                var claims = new List<Claim>
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, person.Login),
                    new Claim(ClaimsIdentity.DefaultRoleClaimType, person.Role)
                };
                ClaimsIdentity claimsIdentity =
                new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType,
                    ClaimsIdentity.DefaultRoleClaimType);
                return claimsIdentity;
            }

            // если пользователя не найдено
            return null;
        }

        [Route("AddUser")]
        [HttpPost]
        public object AddUser(string login, string password, string role)
        {
            var response = new
            {
                logins = role,
                status = "succ",
                message = "good work"
            }; ;
            try
            {
                User newUser = new User();
                newUser.Login = login;
                newUser.Password = password;
                newUser.Role = role;
                db.Users.Add(newUser);
                db.SaveChanges();
                response = new
                {
                    logins = role,
                    status = "succ",
                    message = "good work"
                };
                return newUser;
            }
            catch (Exception ex)
            {
                Console.Write(ex.Message);
            }

            response = new
            {
                logins = role + ' ' + login + ' ' + password,
                status = "error",
                message = "bad"
            };
            return Json(response);
        }
    }
}

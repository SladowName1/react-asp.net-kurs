using KURSOVOI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace KURSOVOI.Controllers
{
    [Route("[controller]")]
    public class RecordController : Controller
    {
        private readonly tricksContext context;
        public RecordController(tricksContext tricks)
        {
            context = tricks;
        }
        [HttpGet]
        public IActionResult Index()
        {
            return Ok(context.Users.ToArray());
        }

        [HttpGet("getGroups")]
        public IActionResult GetGroups()
        {
            return Ok(context.Typeproducts.ToArray());
        }

        [HttpPost("insertVideo")]
        [Authorize(Roles = "admin")]
        public IActionResult InsertVideo(string name, string description, string video, string type)
        {
            Typeproduct typeproduct = context.Typeproducts.ToList().Find(options => options.Name == type);
            Product product = new Product();
            product.Name = name;
            product.Description = description;
            product.Video = video;
            product.IdTypeProduct = typeproduct.Id;
            context.Products.Add(product);
            context.SaveChanges();
            return Ok(new
            {
                res = "ok"
            });
        }

        [HttpGet("getProduct")]
        public IActionResult GetProduct(string id)
        {
            List<Product> products = context.Products.ToList().FindAll(options => options.IdTypeProduct == Convert.ToInt32(id));
            return Ok(products);

        }

        [HttpGet("getAllProduct")]
        public IActionResult GetAllProduct()
        {
            List<Product> products = context.Products.ToList();
            return Ok(products);
        }

        [HttpGet("getOneProduct")]
        public IActionResult GetOneProduct(string id)
        {
            Product product = context.Products.ToList().Find(options => options.Id == Convert.ToInt32(id));
            return Ok(product);
        }

        [HttpPost("insertLike")]
        [Authorize]
        public IActionResult InsertLike(string idUser, string idProduct)
        {
            User user = context.Users.ToList().Find(options => options.Login == idUser);
            Product product = context.Products.ToList().Find(options => options.Id == Convert.ToInt32(idProduct));

            product.NumberOfLikes = product.NumberOfLikes + 1;
            context.Products.Update(product);
            context.SaveChanges();

            Favorite favorite = new Favorite();
            favorite.IdUser = user.Id;
            favorite.IdProduct = product.Id;
            context.Favorites.Add(favorite);
            context.SaveChanges();

            return Ok(new
            {
                description=product.Description,
                id=product.Id,
                idTypeProduct=product.IdTypeProduct,
                name=product.Name,
                numberOfLikes=product.NumberOfLikes,
                video=product.Video
            });

        }

        [HttpPost("deleteLike")]
        [Authorize]
        public IActionResult DeleteLike(string idUser, string idProduct)
        {
            User user = context.Users.ToList().Find(options => options.Login == idUser);
            Product product = context.Products.ToList().Find(options => options.Id == Convert.ToInt32(idProduct));
            Favorite favorite = context.Favorites.ToList().Find(options => options.IdUser == user.Id);

            product.NumberOfLikes = product.NumberOfLikes - 1;
            context.Products.Update(product);
            context.Favorites.Remove(favorite);
            context.SaveChanges();


            return Ok(new
            {
                description = product.Description,
                id = product.Id,
                idTypeProduct = product.IdTypeProduct,
                name = product.Name,
                numberOfLikes = product.NumberOfLikes,
                video = product.Video
            });

        }

        [HttpGet("getFavorite")]
        [Authorize]
        public IActionResult GetFavorite(string id)
        {
            List<Favorite> favorites = context.Favorites.ToList().FindAll(options => options.IdUser == Convert.ToInt32(id));
            context.SaveChanges();

            List<Product> products = new List<Product>();
            for (int i = 0; i < favorites.Count; i++)
            {
                Product checkProduct = context.Products.ToList().Find(options => options.Id == favorites[i].IdProduct);
                context.SaveChanges();
                products.Add(checkProduct);
            }
            return Ok(products);
        }

        [HttpGet("checkFavorite")]
        [Authorize]
        public IActionResult CheckFavorite(string id, string idProduct)
        {
            List<Favorite> favorites = context.Favorites.ToList().FindAll(options => options.IdUser == Convert.ToInt32(id) && options.IdProduct== Convert.ToInt32(idProduct));
            if (favorites.Count == 0)
            {
                return Ok(new
                {
                    like = false
                });
            }
            else
            {
                return Ok(new
                {
                    like = true
                });
            }
            
        }

        [HttpPost("deleteProduct")]
        [Authorize(Roles ="admin")]
        public IActionResult DeleteProduct(string id)
        {
            List<Favorite> favorites = context.Favorites.ToList().FindAll(options => options.IdProduct == Convert.ToInt32(id));
            Product product = context.Products.ToList().Find(options => options.Id == Convert.ToInt32(id));
            context.Favorites.RemoveRange(favorites);
            context.SaveChanges();
            context.Products.Remove(product);
            context.SaveChanges();

            return Ok(new
            {
                res = "Yes"
            });
        }

        [HttpPost("updateProduct")]
        [Authorize(Roles = "admin")]
        public IActionResult UpdateProduct(string id,string name, string description)
        {
            Product product = context.Products.ToList().Find(options => options.Id == Convert.ToInt32(id));
            product.Name = name;
            product.Description = description;
            context.Products.Update(product);
            context.SaveChanges();

            return Ok(product);
        }

        [HttpPost("insertUserVideo")]
        [Authorize(Roles ="user")]
        public IActionResult InsertUserVideo(string id, string url)
        {
            User user = context.Users.ToList().Find(options => options.Id == Convert.ToInt32(id));
            Productverification productverification = new Productverification();
            productverification.IdUser = user.Id;
            productverification.Video = url;
            productverification.Verification = "checked";
            context.Productverifications.Add(productverification);
            context.SaveChanges();

            return Ok(new
            {
                res = "Your video add"
            });
            
        }

        [HttpGet("getUserVideo")]
        [Authorize]
        public IActionResult GetUserVideo(string id)
        {
            List<Productverification> productverifications = context.Productverifications.ToList().FindAll(options => options.IdUser == Convert.ToInt32(id));
            if(productverifications!=null)
            {
                return Ok(productverifications);
            }
            return Ok(new
            {
                video = "no"
            });
        }

        [HttpPost("cancelVideo")]
        [Authorize(Roles ="admin")]
        public IActionResult CancelVideo (string id)
        {
            Productverification productverification = context.Productverifications.ToList().Find(options => options.Id == Convert.ToInt32(id));
            int userID = productverification.IdUser;
            productverification.Verification = "not";
            context.Productverifications.Update(productverification);
            context.SaveChanges();

            List<Productverification> productverifications = context.Productverifications.ToList().FindAll(options => options.IdUser == userID);
            if (productverifications != null)
            {
                return Ok(productverifications);
            }
            return Ok(new
            {
                video = "no"
            });
        }

        [HttpGet("getUserVideoForAdmin")]
        [Authorize(Roles = "admin")]
        public IActionResult GetUserVideoForAdmin(string id)
        {
            Productverification productverification = context.Productverifications.ToList().Find(options => options.Id == Convert.ToInt32(id));
            productverification.Verification = "yes";
            return Ok(new
            {
                video = productverification.Video
            });
        }

        [HttpGet("getUserForAdmin")]
        [Authorize(Roles ="admin")]
        public IActionResult GetUserForAdmin(string id)
        {
            User user = context.Users.ToList().Find(options => options.Id == Convert.ToInt32(id));
            Infoaboutuser infoaboutuser = context.Infoaboutusers.ToList().Find(options => options.IdUser == user.Id);
             return Ok(new
             {
                 user = user,
                 infoaboutuser = infoaboutuser
             });
        }

        [HttpPost("updateUser")]
        [Authorize(Roles = "admin")]
        public IActionResult UpdateUser(string id,string role)
        {
            User user = context.Users.ToList().Find(options => options.Id == Convert.ToInt32(id));
            user.Role = role;
            context.Users.Update(user);
            context.SaveChanges();
            Infoaboutuser infoaboutuser = context.Infoaboutusers.ToList().Find(options => options.IdUser == user.Id);
            return Ok(new
            {
                user = user,
                infoaboutuser = infoaboutuser
            });
        }
    }
}

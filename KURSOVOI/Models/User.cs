using System;
using System.Collections.Generic;

#nullable disable

namespace KURSOVOI.Models
{
    public partial class User
    {
        public User()
        {
            Favorites = new HashSet<Favorite>();
            Infoaboutusers = new HashSet<Infoaboutuser>();
            Productverifications = new HashSet<Productverification>();
        }

        public int Id { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }

        public virtual ICollection<Favorite> Favorites { get; set; }
        public virtual ICollection<Infoaboutuser> Infoaboutusers { get; set; }
        public virtual ICollection<Productverification> Productverifications { get; set; }
    }
}

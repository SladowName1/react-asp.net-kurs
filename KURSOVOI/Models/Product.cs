using System;
using System.Collections.Generic;

#nullable disable

namespace KURSOVOI.Models
{
    public partial class Product
    {
        public Product()
        {
            Favorites = new HashSet<Favorite>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Video { get; set; }
        public int IdTypeProduct { get; set; }
        public int? NumberOfLikes { get; set; }

        public virtual Typeproduct IdTypeProductNavigation { get; set; }
        public virtual ICollection<Favorite> Favorites { get; set; }
    }
}

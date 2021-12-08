using System;
using System.Collections.Generic;

#nullable disable

namespace KURSOVOI.Models
{
    public partial class Typeproduct
    {
        public Typeproduct()
        {
            Products = new HashSet<Product>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Photo { get; set; }

        public virtual ICollection<Product> Products { get; set; }
    }
}

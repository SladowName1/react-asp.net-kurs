using System;
using System.Collections.Generic;

#nullable disable

namespace KURSOVOI.Models
{
    public partial class Productverification
    {
        public int Id { get; set; }
        public int IdUser { get; set; }
        public string Video { get; set; }
        public string Verification { get; set; }

        public virtual User IdUserNavigation { get; set; }
    }
}

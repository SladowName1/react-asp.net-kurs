using System;
using System.Collections.Generic;

#nullable disable

namespace KURSOVOI.Models
{
    public partial class Infoaboutuser
    {
        public int Id { get; set; }
        public int IdUser { get; set; }
        public string Email { get; set; }
        public string Photo { get; set; }
        public DateTime? Lastlogin { get; set; }

        public virtual User IdUserNavigation { get; set; }
    }
}

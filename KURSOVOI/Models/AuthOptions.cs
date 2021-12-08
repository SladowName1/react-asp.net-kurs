using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KURSOVOI.Models
{
    public class AuthOptions
    {
        public const string ISSUER = "Sladow"; // издатель токена
        public const string AUDIENCE = "Client"; // потребитель токена
        const string KEY = "GhbdtnTUjh123GfifRfqaZXCGOu";   // ключ для шифрации
        public const int LIFETIME = 60; // время жизни токена - 1 минута
        public static SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(KEY));
        }
    }
}

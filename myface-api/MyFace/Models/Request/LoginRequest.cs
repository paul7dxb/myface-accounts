using System.ComponentModel.DataAnnotations;

namespace MyFace.Models.Request
{
    public class LoginRequest
    {

        [Required]
        [StringLength(70)]
        public string Username { get; set; }
        [Required]
        [StringLength(70)]
        public string Password { get; set; }

    }
}
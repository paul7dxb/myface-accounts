using System.ComponentModel.DataAnnotations;

namespace MyFace.Models.Request
{
    public class CreatePostRequest
    {
        [Required]
        [StringLength(140)]
        public string Message { get; set; }
        
        public string ImageUrl { get; set; }
        

    }
}
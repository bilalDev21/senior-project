using System.ComponentModel.DataAnnotations;

namespace Back_end.Dtos
{
    public class CreateUserDto
    {
        [MaxLength(20)]
        public string Name { get; set; }

        [MaxLength(100)]
        public string Email { get; set; }

        [MaxLength(20)]
        public string Password { get; set; }
 
    }
}

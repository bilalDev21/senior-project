using System.ComponentModel.DataAnnotations;

namespace Back_end.Models
{
    public class Request
    {
        public int Id { get; set; }

        [MaxLength(20)]
        public string Status { get; set; }
        public int UserId { get; set; } 

        public User User { get; set; }

        public int EventId { get; set; }

        public Event Event { get; set; }
    }
}

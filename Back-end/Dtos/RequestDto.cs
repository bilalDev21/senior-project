using Back_end.Models;
using System.ComponentModel.DataAnnotations;

namespace Back_end.Dtos
{
    public class RequestDto
    {
        public int UserId { get; set; }

        public int EventId { get; set; }

        [MaxLength(20)]
        public string Status { get; set; }
        
    }
}

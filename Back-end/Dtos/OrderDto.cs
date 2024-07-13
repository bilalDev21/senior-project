using Back_end.Models;

namespace Back_end.Dtos
{
    public class OrderDto
    {
        public int UserId { get; set; }      
        public int ToolId { get; set; }
        public string Status { get; set; }
    }
}

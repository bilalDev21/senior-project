using Back_end.Models;

namespace Back_end.Dtos
{
    public class ToolDto
    {      
        public string Name { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
        public int Tax { get; set; }
        public string Status { get; set; }
        public int Quantity { get; set; }
    }
}

using Back_end.Models;

namespace Back_end.Dtos
{
    public class ReportDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public string Status { get; set; }
        public string Image { get; set; }
        public int UserId { get; set; }
    }
}

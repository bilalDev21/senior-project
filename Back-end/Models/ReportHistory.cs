namespace Back_end.Models
{
    public class ReportHistory
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public string Status { get; set; }
        public string Image { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
    }
}

namespace Back_end.Models
{
    public class Tax
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public string Status { get; set; }
        public int Amount { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
    }
}

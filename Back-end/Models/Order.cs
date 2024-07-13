namespace Back_end.Models
{
    public class Order
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public User User { get; set; }

        public int ToolId { get; set; }

        public Tool Tool { get; set; }

        public string Status { get; set; }

    }
}

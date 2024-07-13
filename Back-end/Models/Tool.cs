namespace Back_end.Models
{
    public class Tool
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
        public int Tax { get; set; }
        public string Status { get; set; }
        public int Quantity { get; set; }
        public List<Order> Order { get; set; }

    }
}

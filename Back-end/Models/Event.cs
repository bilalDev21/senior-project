using System.ComponentModel.DataAnnotations;

namespace Back_end.Models
{
    public class Event
    {
        public int Id { get; set; }

        [MaxLength(20)]
        public string Name { get; set; }

        [MaxLength(200)]
        public string Description { get; set; }

        [MaxLength(20)]
        public string Type { get; set; }

        public DateTime Date { get; set; }

        public List<Request> Requests { get; set; }

    }
}

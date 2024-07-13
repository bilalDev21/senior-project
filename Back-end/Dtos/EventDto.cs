using System.ComponentModel.DataAnnotations;

namespace Back_end.Dtos
{
    public class EventDto
    {
        [MaxLength(20)]
        public string Name { get; set; }

        [MaxLength(200)]
        public string Description { get; set; }

        [MaxLength(20)]
        public string Type { get; set; }

        public DateTime Date { get; set; }

    }
}

using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace Back_end.Models
{
    public class User
    {
        public int Id { get; set; }

        [MaxLength(20)]
        public string Name { get; set; }

        [MaxLength(100)]
        public string Email { get; set; }

        [MaxLength(20)]
        public string Password { get; set; }

        [MaxLength(20)]
        public string Role { get; set; }

        public List <Request> Requests { get; set; }

        public List<Report> Reports { get; set; }

        public List<ReportHistory> reportHistories { get; set; }

        public List <Order> orders { get; set; }
        public List<Tax> taxes { get; set; }
    }
}
    
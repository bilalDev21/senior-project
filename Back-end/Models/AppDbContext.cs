using Microsoft.EntityFrameworkCore;
namespace Back_end.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Event> Events { get; set; }
        public DbSet<Request> Requests { get; set; }
        public DbSet<Report> Reports { get; set; }
        public DbSet<Order> orders { get; set; }
        public DbSet<Tool> Tools { get; set; }
        public DbSet<ReportHistory> reportHistories { get; set; }
        public DbSet<Tax> taxes { get; set; }
 

    }
}

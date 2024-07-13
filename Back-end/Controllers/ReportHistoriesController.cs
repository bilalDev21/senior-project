using Back_end.Dtos;
using Back_end.Migrations;
using Back_end.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace Back_end.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportHistoriesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ReportHistoriesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("AllHistory")]
        public async Task<IActionResult> GetAllHistory()
        {
            // Retrieve all report with related user 
            var history = await _context.reportHistories
                .Include(r => r.User)
                .ToListAsync();

            if (history == null)
            {
                return NotFound();
            }

            // Transform reports into a simplified model with only necessary attributes
            var simplifiedRequests = history.Select(r => new
            {
                r.Id,
                r.Title,
                r.Description,
                r.Location,
                r.Status,
                r.Image,
                r.User.Name,
            });

            return Ok(simplifiedRequests);
        }

        [HttpGet]
        public async Task<IActionResult> SaveReportsToHistory()
        {
            // Retrieve all reports with status "accepted" and "rejected"
            var statusReports = await _context.Reports
                .Where(r => r.Status == "Done"|| r.Status == "Canceled")
                .ToListAsync();

            // Iterate over each accepted report and save its data to history
            foreach (var report in statusReports)
            {
                var history = new ReportHistory
                {
                    Title = report.Title,
                    Description = report.Description,
                    Location = report.Location,
                    Status = report.Status,
                    Image = report.Image,
                    UserId = report.UserId,
                    // You might need to adjust this if the relationship with User needs to be copied
                    User = report.User
                };

                await _context.reportHistories.AddAsync(history);

                // Delete the accepted report from the Reports table
                _context.Reports.Remove(report);
            }

            // Save changes to the database
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHistory(int id)
        {
            var his = await _context.reportHistories.SingleOrDefaultAsync(r => r.Id == id);

            if (his == null)
                return NotFound("No history was Found");

            _context.reportHistories.Remove(his);
            _context.SaveChanges();

            return Ok();
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetHistoryByUserId(int userId)
        {
            // Retrieve all history with the given user ID
            var history = await _context.reportHistories
                .Where(r => r.UserId == userId)
                .ToListAsync();

            if (history == null || history.Count == 0)
            {
                return NotFound("No history found for the given user ID");
            }

            // Transform history into a simplified model with only necessary attributes
            var simplifiedHistory = history.Select(r => new
            {
                historyId = r.Id,
                title = r.Title,
                description = r.Description,
                Location = r.Location,
                Status = r.Status,
                Image = r.Image,
            });

            return Ok(simplifiedHistory);
        }
    }
}

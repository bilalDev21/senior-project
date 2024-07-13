using Back_end.Dtos;
using Back_end.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Back_end.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ReportController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CreateReport([FromForm] ReportDto dto)
        {
            var report = new Report
            {
                Title = dto.Title,
                Description = dto.Description,
                Location = dto.Location,
                Status = dto.Status,
                Image = dto.Image,
                UserId = dto.UserId,
            };

            await _context.Reports.AddAsync(report);
            _context.SaveChanges();

            return Ok(report);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllReport()
        {
            // Retrieve all report with related user 
            var reports = await _context.Reports
                .Include(r => r.User)  
                .ToListAsync();

            if (reports == null || reports.Count == 0)
            {
                return NotFound();
            }

            // Transform reports into a simplified model with only necessary attributes
            var simplifiedRequests = reports.Select(r => new
            {
                reportId = r.Id,
                title = r.Title,
                description = r.Description,
                Location = r.Location,
                Status = r.Status,
                Image = r.Image,
                userName = r.User.Name,
            });

            return Ok(simplifiedRequests);
        }

        [HttpGet("AllReportById{id}")]
        public async Task<IActionResult> GetAllReportById(int id )
        {
            var reports = await _context.Reports
                                        .Where(r => r.UserId == id)
                                        .Select(r => new {
                                             reportId = r.Id,
                                             title = r.Title,
                                             description = r.Description,
                                             Location = r.Location,
                                             Status = r.Status,
                                             Image = r.Image,
                                        })
                                        .ToListAsync();
            return Ok(reports);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReport(int id)
        {
            var re = await _context.Reports
                .Include(r => r.User) // Include the User entity
                .SingleOrDefaultAsync(r => r.Id == id);

            if (re == null)
                return NotFound("No Event was Found");

            _context.Reports.Remove(re);
            _context.SaveChanges();

            // Create an anonymous object without the ID
            var response = new
            {
                title = re.Title,
                description = re.Description,
                location = re.Location,
                status = re.Status,
                image = re.Image,
                userId = re.UserId // Assuming UserId is a property of the Report entity
            };

            return Ok(response);
        }

    [HttpPut("{id}")]
        public async Task<IActionResult> UpdateStatus(int id, [FromBody] StatusDto r)
        {
            var report = await _context.Reports.SingleOrDefaultAsync(r => r.Id == id);

            if (report == null)
                return NotFound($"Not found this id {id}");

            report.Status = r.Status;

            _context.SaveChanges();

            return Ok();
        }
    }
}

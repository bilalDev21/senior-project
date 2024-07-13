using Back_end.Dtos;
using Back_end.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Back_end.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RequestController : ControllerBase
    {
        private readonly AppDbContext _context;

        public RequestController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CreateRequest(RequestDto dto)
        {
            var status = string.IsNullOrEmpty(dto.Status) ? "In Progress" : dto.Status;

            var request = new Request { UserId = dto.UserId, EventId = dto.EventId, Status = status };

            await _context.Requests.AddAsync(request);
            _context.SaveChanges();

            return Ok(request);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllRequests()
        {
            // Retrieve all requests with related user and event information
            var requests = await _context.Requests
                .Include(r => r.User)
                .Include(r => r.Event)
                .ToListAsync();

            if (requests == null || requests.Count == 0)
            {
                return NotFound();
            }

            // Transform requests into a simplified model with only necessary attributes
            var simplifiedRequests = requests.Select(r => new
            {
                requestId = r.Id,
                UserName = r.User.Name,
                EventName = r.Event.Name,
                Status = r.Status
            });

            return Ok(simplifiedRequests);
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetAllRequestById(int id)
        {
            // Retrieve all requests that include the given id
            var requests = await _context.Requests
                                        .Where(r => r.UserId == id)
                                        .Select(r => new {
                                            requestId = r.Id,
                                            UserName = r.User.Name,
                                            EventName = r.Event.Name,
                                            Status = r.Status
                                        })
                                        .ToListAsync();

            if (requests == null)
            {
                return NotFound();
            }

            return Ok(requests);
        }


        [HttpPut("{id}")]
        public async Task <IActionResult> UpdateRequest(int id, [FromBody] StatusDto r)
        {
            var request = await _context.Requests.SingleOrDefaultAsync(r => r.Id == id);    

            if (request == null)
                return NotFound($"Not found this id {id}");
            
            request.Status = r.Status;

            _context.SaveChanges();

            return Ok(request);      
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRequest(int id)
        {
            var re = await _context.Requests.SingleOrDefaultAsync(r => r.Id == id);

            if (re == null)
                return NotFound("No Event was Found");

            _context.Requests.Remove(re);
            _context.SaveChanges();

            return Ok();
        }
    }
}
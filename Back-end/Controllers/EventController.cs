using Back_end.Dtos;
using Back_end.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Back_end.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class EventController : ControllerBase
    {
        private readonly AppDbContext _context;

        public EventController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllEvent()
        {
            var events = await _context.Events.ToListAsync();
            return Ok(events);
        }
 
        [HttpPost]
        public async Task<IActionResult> CreateEvent(EventDto dto)
        {
            var e = new Event
            {
                Name = dto.Name,
                Description = dto.Description,
                Type = dto.Type,
                Date = dto.Date
            };

            await _context.Events.AddAsync(e);
            _context.SaveChanges();

            return Ok(e);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetEventById(int id)
        {
            var e = await _context.Events.FindAsync(id);

            if (e == null)
            {
                return NotFound();
            }

            return Ok(e);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEvent(int id, [FromBody] EventDto eve)
        {
            var e = await _context.Events.SingleOrDefaultAsync(r => r.Id == id);

            if (e == null)
                return NotFound($"Not found this id {id}");

            e.Name = eve.Name;
            e.Description = eve.Description;
            e.Type = eve.Type;
            e.Date = eve.Date;

            _context.SaveChanges();

            return Ok(e);
        }

        [HttpDelete("{id}")]
        public async Task <IActionResult> DeleteEvent(int id)
        {
            var ev = await _context.Events.SingleOrDefaultAsync(e => e.Id == id);

            if(ev == null) 
                return NotFound("No Event was Found");
            
            _context.Events.Remove(ev);
            _context.SaveChanges();

            return Ok();
        }
    }
}

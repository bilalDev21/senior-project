using Azure.Core;
using Back_end.Dtos;
using Back_end.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Back_end.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ToolController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ToolController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CreateTool([FromForm] ToolDto dto)
        {
            var tool = new Tool
            {
                Name = dto.Name,
                Description = dto.Description,
                Image = dto.Image,
                Tax = dto.Tax,
                Quantity = dto.Quantity,    
                Status = dto.Status,
            };

            await _context.Tools.AddAsync(tool);
            _context.SaveChanges();

            return Ok(tool);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllTool()
        {
            var tools = await _context.Tools.ToListAsync();
            return Ok(tools);
        }

        [HttpPost("{id}")]
        public async Task<IActionResult> UpdateQuantity(int id)
        {
            var t = await _context.Tools.SingleOrDefaultAsync(r => r.Id == id);

            if (t == null)
                return NotFound($"Not found this id {id}");

            t.Quantity -= 1;

            if(t.Quantity == 0)
            {
                t.Status = "not available";
            }

            _context.SaveChanges();

            return Ok();
        }

        [HttpGet("oneTool{id}")]
        public async Task<IActionResult> GetToolById(int id)
        {
            var t = await _context.Tools.FindAsync(id);

            if (t == null)
            {
                return NotFound();
            }

            return Ok(t);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTool(int id, [FromForm] ToolDto tool)
        {
            var t = await _context.Tools.SingleOrDefaultAsync(r => r.Id == id);

            if (t == null)
                return NotFound($"Not found this id {id}");

            t.Name = tool.Name;
            t.Description = tool.Description;
            t.Quantity = tool.Quantity;
            t.Tax = tool.Tax;
            t.Image = tool.Image;

            _context.SaveChanges();

            return Ok(t);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTool(int id)
        {
            var t = await _context.Tools.SingleOrDefaultAsync(e => e.Id == id);

            if (t == null)
                return NotFound("No Event was Found");

            _context.Tools.Remove(t);
            _context.SaveChanges();

            return Ok();
        }
    }
}

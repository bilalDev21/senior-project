using Back_end.Dtos;
using Back_end.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Back_end.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaxController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TaxController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("{userId}")]
        public async Task<IActionResult> CreateTaxOfTool(int userId, [FromBody] TaxDto amount)
        {
            var tax = await _context.taxes.SingleOrDefaultAsync(r => r.UserId == userId);

            if (tax == null)
            {
                var t = new Tax
                {
                    Type = "Tax-Tool",
                    Amount = amount.Amount,
                    Status = "Unpaid",
                    UserId = userId
                };
                await _context.taxes.AddAsync(t);
                await _context.SaveChangesAsync();

                return Ok();
            }

            int a = amount.Amount;
            tax.Amount += a;

            _context.taxes.Update(tax); // Update the existing entity
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}

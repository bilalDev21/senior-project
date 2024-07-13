using Back_end.Dtos;
using Back_end.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Back_end.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly AppDbContext _context;

        public OrderController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CreateOrder(OrderDto dto)
        {
            //var tool = await _context.Tools.FindAsync(dto.ToolId);

            //if (tool == null)
            //{
            // return NotFound("Tool not found");
            //}

            //.OrdersNumberForEachTool++;

            // Create a new order
            var order = new Order
            {
                UserId = dto.UserId,
                ToolId = dto.ToolId,
                Status = dto.Status,
            };

            await _context.orders.AddAsync(order);


            await _context.SaveChangesAsync();

            return Ok(order);
        }


        [HttpGet]
        public async Task<IActionResult> GetAllOrders()
        {
            
            var orders = await _context.orders
                .Include(r => r.User)
                .Include(r => r.Tool)
                .ToListAsync();

            if (orders == null)
            {
                return NotFound();
            }

          
            var simplifiedOrders = orders.Select(r => new
            {
                orderId = r.Id,
                UserName = r.User.Name,
                ToolName = r.Tool.Name,
                Status = r.Status
            });

            return Ok(simplifiedOrders);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetAllOrderById(int id)
        {
        
            var orders = await _context.orders
                                        .Where(r => r.UserId == id)
                                        .Select(r => new {
                                            orderId = r.Id,
                                            UserName = r.User.Name,
                                            ToolName = r.Tool.Name,
                                            Status = r.Status
                                        })
                                        .ToListAsync();

            if (orders == null)
            {
                return NotFound();
            }

            return Ok(orders);
        }

        [HttpGet("OrderAndTool{orderId}")]
        public async Task<IActionResult> UpdateOrderTool(int orderId)
        {
            // Retrieve the order based on the provided orderId
            var order = await _context.orders.SingleOrDefaultAsync(o => o.Id == orderId);

            if (order == null)
                return NotFound($"Not found this id {orderId}");

            var tool = await _context.Tools.SingleOrDefaultAsync(t => t.Id == order.ToolId);

            if (tool == null)
                return NotFound($"Tool not found for order id {orderId}");
 
            tool.Quantity += 1;

            // Update the tool's status based on its quantity
            if (tool.Quantity > 0)
            {
                tool.Status = "Available";
            }

            // Update the order's status
            order.Status = "Finished";

            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            var order = await _context.orders.SingleOrDefaultAsync(o => o.Id == id);

            if (order == null)
                return NotFound("No Event was Found");

            _context.orders.Remove(order);
            _context.SaveChanges();

            return Ok();
        }

    }

}

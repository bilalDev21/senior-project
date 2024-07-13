using Back_end.Dtos;
using Back_end.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Back_end.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class userController : ControllerBase
    {
        private readonly AppDbContext _context;

        public userController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task <IActionResult> GetAllUser()
        {
            var users = await _context.Users.ToListAsync();
            return Ok(users);
        }

        [HttpGet("{id}")]
        public async Task <IActionResult> GetUserById (int id)
        {
            var user = await _context.Users.FindAsync (id);

            if(user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        [HttpPost]
        public async Task<IActionResult> CreateUser(CreateUserDto dto)
        {
            var user = new User { Name = dto.Name, Email = dto.Email, Password = dto.Password, Role = "user" };

            await _context.Users.AddAsync(user);
            _context.SaveChanges();

            return Ok(user.Id);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var u = await _context.Users.SingleOrDefaultAsync(u => u.Id == id);

            if (u == null)
                return NotFound("No Event was Found");

            _context.Users.Remove(u);
            _context.SaveChanges();

            return Ok();
        }

        [HttpPost("admin")]
        public async Task<IActionResult> CreateTool(UserDto dto)
        {
            var user = new User
            {
                Name = dto.Name,
                Email = dto.Email,
                Password = dto.Password,
                Role = dto.Role,
            };

            await _context.Users.AddAsync(user);
            _context.SaveChanges();

            return Ok();
        }
    }
}

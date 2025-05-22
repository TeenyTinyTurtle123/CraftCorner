using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Dto;
using server.Entities;

namespace server.Controllers;

[ApiController]
[Route("[controller]")]
public class UserController : ControllerBase
{
    private readonly AppDbContext _context;

    public UserController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet("GetAll")]
    public ActionResult GetAll()
    {
        var users = _context.Users.ToList();
        return Ok(users);
    }
    
    [HttpPost("Login")]
    public ActionResult Login([FromBody] LoginDto loginDto)
    {
        var user = _context.Users.FirstOrDefault(u => u.Username == loginDto.Username && u.Password == loginDto.Password);
        
        if(user == null)
            return Unauthorized("Invalid username or password");
        
        return Ok(new { user.Id, user.Username });
    }

    [HttpPost("Register")]
    // FromBody is JSON
    public async Task<ActionResult> Register([FromBody] LoginDto loginDto)
    {
        var usernameTaken = await _context.Users.AnyAsync(u => u.Username == loginDto.Username);
        if (usernameTaken)
        {
            return BadRequest("Username is already taken");
        }

        var user = new User
        {
            Username = loginDto.Username,
            Password = loginDto.Password,
            CreatedAt = DateTime.UtcNow
        };
        _context.Users.Add(user);
        await _context.SaveChangesAsync();
        
        return Ok(user);
    }
}
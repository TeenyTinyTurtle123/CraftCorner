using Microsoft.AspNetCore.Mvc;
using server.Dto;

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
}
using Microsoft.AspNetCore.Mvc;

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
}
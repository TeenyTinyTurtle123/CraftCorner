using Microsoft.AspNetCore.Mvc;
using server.Dto;
using server.models;

namespace server.Controllers;

[ApiController]
[Route("[controller]")]
public class ProjectController : ControllerBase
{
    private readonly AppDbContext _context;

    public ProjectController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet("GetProjects")]
    public ActionResult GetProjects()
    {
        return Ok(MockData.MockProjectsList);
    }

    // Important to 'Name' each Http request. It doesn't listen to just the function name
    [HttpGet("GetById")]
    public ActionResult GetById(int id)
    {
        var project = _context.Projects.FirstOrDefault(p => p.Id == id);

        if(project == null)
        {
            return NotFound();
        }

        return Ok(project);
    }
        
    [HttpGet("GetProjectsByUserId")]
    public ActionResult GetProjectsByUserId(int userId)
    {
        var projects = _context.Projects.Where(p => p.UserId == userId).ToList();
        return Ok(projects);
    }

    [HttpGet("GetAll")]
    public ActionResult GetAll()
    {
        var projects = _context.Projects.ToList();
        return Ok(projects);
    }

    [HttpPost("AddProject")]
    public async Task<ActionResult> AddProject([FromForm] ProjectDto dto)
    {
        string imageName;

        if (dto.Image != null)
        {
            var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images");
            Directory.CreateDirectory(uploadsFolder);

            imageName = Guid.NewGuid().ToString() + Path.GetExtension(dto.Image.FileName);
            var filePath = Path.Combine(uploadsFolder, imageName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await dto.Image.CopyToAsync(stream);
            }
        }
        else
        {
            // This doesn't actually work
            imageName = dto.ImageName ?? "DefaultProjectImage.jpg";
        }
        
        var project = new Project
        {
            UserId = dto.UserId,
            Title = dto.Title,
            Type = dto.Type,
            Rating = dto.Rating,
            CreatedAt = DateTime.UtcNow,
            Status = Status.WIP,
            ImageURL = imageName // Assuming your entity has this property
        };
        _context.Projects.Add(project);
        await _context.SaveChangesAsync();

        return Ok(project);
    }
    
    [HttpGet("GetProjectById")]
    public ActionResult GetProjectById(int projectId)
    {
        var project = _context.Projects.FirstOrDefault(p => p.Id == projectId);
        return Ok(project);
    }

    [HttpGet("GetProjectsByStatus")]
    public ActionResult GetProjectsByStatus(int status)
    {
        var projects = _context.Projects.Where(p => p.Status == (Status)status).ToList();
        return Ok(projects);
    }    
    
    [HttpGet("GetProjectsByType")]
    public ActionResult GetProjectsByType(string type)
    {
        var projects = _context.Projects.Where(p => p.Type == type).ToList();
        return Ok(projects);
    }
}
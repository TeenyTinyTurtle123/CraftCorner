using Microsoft.AspNetCore.Mvc;
using server.Dto;
using server.Entities;

namespace server.Controllers;

[ApiController]
[Route("[controller]")]
public class ProjectController : ControllerBase
{
    // FromBody is JSON, fromForm is something else. fromForm is used with pictures and files
    // FormData cannot be bound to [FromBody] in ASP.NET. It must be [FromForm].
    private readonly AppDbContext _context;

    public ProjectController(AppDbContext context)
    {
        _context = context;
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
        string imageName = null;
        string pattern = null;

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
            imageName = dto.ImageName ?? "Default.png";
        }
        
        if (dto.Pattern != null)
        {
            var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "patterns");
            Directory.CreateDirectory(uploadsFolder);

            pattern = Guid.NewGuid().ToString() + Path.GetExtension(dto.Pattern.FileName);
            var filePath = Path.Combine(uploadsFolder, pattern);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await dto.Pattern.CopyToAsync(stream);
            }
        }
        
        var project = new Project
        {
            UserId = dto.UserId,
            Title = dto.Title,
            ProjectType = dto.Type,
            Rating = dto.Rating,
            CreatedAt = dto.CreatedAt.ToUniversalTime(),
            FinishedAt = dto.FinishedAt?.ToUniversalTime(),
            Status = dto.Status,
            Notes = dto.Notes,
            PatternURL = pattern,
            ImageURL = imageName // Assuming your entity has this property
        };
        _context.Projects.Add(project);
        await _context.SaveChangesAsync();

        return Ok(project);
    }

    [HttpPost("EditProject")]
    public async Task<ActionResult> EditProject([FromForm] ProjectDto dto)
    {
        var databaseProject = _context.Projects.FirstOrDefault(p => p.Id == dto.Id);
        
        if (databaseProject == null)
        {
            return NotFound($"Project with ID {dto.Id} not found.");
        }

        databaseProject.Title = dto.Title;
        databaseProject.ProjectType = dto.Type;
        databaseProject.Rating = dto.Rating;
        databaseProject.Status = dto.Status;
        databaseProject.Notes = dto.Notes;
        databaseProject.FinishedAt = dto.FinishedAt?.ToUniversalTime();
        
        if (dto.CreatedAt != null)
        {
            databaseProject.CreatedAt = dto.CreatedAt.ToUniversalTime();
        }
        
        // image upload
        if (dto.Image != null && dto.Image.Length > 0)
        {
            // Only delete old image if it's not the default one
            if (!string.IsNullOrEmpty(databaseProject.ImageURL) && databaseProject.ImageURL != "Default.png")
            {
                var oldImagePath = Path.Combine("wwwroot/images", databaseProject.ImageURL);
                if (System.IO.File.Exists(oldImagePath))
                {
                    System.IO.File.Delete(oldImagePath);
                }
            }

            // Save new image
            var imageFileName = Guid.NewGuid() + Path.GetExtension(dto.Image.FileName);
            var imagePath = Path.Combine("wwwroot/images", imageFileName);

            await using (var stream = new FileStream(imagePath, FileMode.Create))
            {
                await dto.Image.CopyToAsync(stream);
            }

            databaseProject.ImageURL = imageFileName;
        }

        // pattern upload
        if (dto.Pattern != null && dto.Pattern.Length > 0)
        {
            var patternFileName = Guid.NewGuid() + Path.GetExtension(dto.Pattern.FileName);
            var patternPath = Path.Combine("wwwroot/patterns", patternFileName);

            await using (var stream = new FileStream(patternPath, FileMode.Create))
            {
                await dto.Pattern.CopyToAsync(stream);
            }

            databaseProject.PatternURL = patternFileName;
        }

        await _context.SaveChangesAsync();
        return Ok(databaseProject);
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
}
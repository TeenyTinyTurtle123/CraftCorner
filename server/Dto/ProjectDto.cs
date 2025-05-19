using server.models;
using Type = System.Type;

namespace server.Dto;

public class ProjectDto
{
    public int UserId { get; set; }
    public string Title { get; set; }
    public ProjectType Type { get; set; }
    public int Rating { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? FinishedAt { get; set; }
    public Status Status { get; set; }
    public string? Notes { get; set; }

    // This is for the uploaded file
    public IFormFile? Image { get; set; }

    // Optional fallback if no image file is uploaded
    public string? ImageName { get; set; }
    public IFormFile? Pattern { get; set; }
}
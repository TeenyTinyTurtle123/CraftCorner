namespace server.Dto;

public class ProjectDto
{
    public int UserId { get; set; }
    public string Title { get; set; }
    public string Type { get; set; }
    public int Rating { get; set; }

    // This is for the uploaded file
    public IFormFile? Image { get; set; }

    // Optional fallback if no image file is uploaded
    public string? ImageName { get; set; }
}
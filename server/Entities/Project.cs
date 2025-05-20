using System.ComponentModel.DataAnnotations.Schema;

namespace server.Entities;

[Table("projects")]
public class Project
{
    [Column("id")]
    public int Id { get; set; }

    [Column("user_id")]
    public int UserId { get; set; }

    [Column("title")]
    public string Title { get; set; }

    [Column("type")] 
    public ProjectType ProjectType { get; set; } = ProjectType.Other;

    [Column("rating")]
    public int Rating { get; set; }

    [Column("created_at")]
    public DateTime CreatedAt { get; set; }
    [Column("finishedAt")] 
    public DateTime? FinishedAt { get; set; }
    
    [Column("status")] 
    public Status Status { get; set; } = Status.WIP;

    [Column("notes")]
    public string? Notes { get; set; }

    [Column("image_url")]
    public string? ImageURL { get; set; }

    public string? PatternURL { get; set; }
}

public enum Status
{
    WIP,
    Finished,
    Deleted,
}

public enum ProjectType
{
    Other,
    Crochet,
    Knit,
    CrossStitch,
    Embroidery
}
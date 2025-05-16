using System.ComponentModel.DataAnnotations.Schema;

namespace server.models;

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
    public string Type { get; set; }

    [Column("rating")]
    public int Rating { get; set; }

    [Column("created_at")]
    public DateTime CreatedAt { get; set; }

    [Column("status")] 
    public Status Status { get; set; } = Status.WIP;

    [Column("image_url")]
    public string? ImageURL { get; set; }
}

public enum Status
{
    WIP,
    Finished,
    Deleted,
}
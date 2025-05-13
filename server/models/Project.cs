namespace server.models;

public class Project
{
    public int Id { get; set; }
    public string? Title { get; set; }
    public string? Type { get; set; }
    public int Rating { get; set; }
    public DateTime CreatedAt { get; set; }
    public Status Status { get; set; } = Status.WIP;
    public string ImageURL { get; set; }
}

public enum Status
{
    WIP,
    Finished,
    Deleted,
}
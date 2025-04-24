public class Project
{
    public int Id { get; set; }
    public string? Title { get; set; }
    public string? Type { get; set; }
    public int Rating { get; set; }
}

public static class MockData
{
    public static List<Project> Projects = new List<Project>
    {
        new() {Id = 1, Title = "Baby Blanket", Type = "Crochet", Rating = 4},
        new() {Id = 2, Title = "Strawberry Hat", Type = "Knit", Rating = 3},
        new() {Id = 3, Title = "Amigurumi Doll", Type = "Crochet", Rating = 5},
        new() {Id = 4, Title = "Blueberry", Type = "Crochet", Rating = 1}
    };
}


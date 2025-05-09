using Microsoft.EntityFrameworkCore;
using server.models;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<Project> Projects { get; set; }
}
using System;
using Microsoft.EntityFrameworkCore;

namespace Server.Database;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    { }

    public DbSet<Todo> Todos { get; set; }
}

public class Todo
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public DateTime CreatedUtc { get; set; } = DateTime.UtcNow;
    public DateTime? CompletedUtc { get; set; }
    public string Value { get; set; }
    public bool Completed => CompletedUtc.HasValue;
}
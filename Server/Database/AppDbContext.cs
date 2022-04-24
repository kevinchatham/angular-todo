using System;
using Microsoft.EntityFrameworkCore;
using Server.Models.Database;

namespace Server.Database;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        var seedValue = Environment.GetEnvironmentVariable("Seed");

        var seed = Boolean.Parse(seedValue);

        if (seed)
        {
            modelBuilder.Entity<Todo>().HasData(
                        new Todo
                        {
                            Id = Guid.Parse("6379bd1f-047d-47bd-a9d1-62a3be901d21"),
                            Value = "Task One",
                            CreatedUtc = DateTime.MinValue
                        },
                        new Todo
                        {
                            Id = Guid.Parse("2a6b34b2-5e6e-4cd4-ae5b-0f2a3ff0b18d"),
                            Value = "Task Two",
                            CreatedUtc = DateTime.MinValue
                        },
                        new Todo
                        {
                            Id = Guid.Parse("5f5c3745-a1e8-4340-beb0-ab5d2892ec25"),
                            Value = "Task Three",
                            CreatedUtc = DateTime.MinValue
                        },
                        new Todo
                        {
                            Id = Guid.Parse("5fa93018-06cb-4bcc-9efd-c09632430a4c"),
                            Value = "Task Four",
                            CreatedUtc = DateTime.MinValue
                        }
                    );
        }
    }
    public DbSet<Todo> Todos { get; set; }
}
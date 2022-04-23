using Microsoft.EntityFrameworkCore;
using Server.Models.Database;

namespace Server.Database;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    { }

    public DbSet<Todo> Todos { get; set; }
}
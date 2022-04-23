using System;

namespace Server.Models.Database;

public sealed class Todo
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public DateTime CreatedUtc { get; set; } = DateTime.UtcNow;
    public DateTime? CompletedUtc { get; set; }
    public string Value { get; set; }
    public bool Completed => CompletedUtc.HasValue;
}
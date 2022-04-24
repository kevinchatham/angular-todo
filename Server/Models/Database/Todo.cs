using System;

namespace Server.Models.Database;

public sealed class Todo
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Value { get; set; }
    public bool Completed { get; set; }
}
namespace Server.Models.Dto;

public sealed class TodoDto
{
    public string Id { get; set; }
    public string CreatedIso { get; set; }
    public string CompletedIso { get; set; }
    public string Value { get; set; }
    public bool Completed { get; set; }
}
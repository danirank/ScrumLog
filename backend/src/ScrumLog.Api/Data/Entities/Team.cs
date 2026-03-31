namespace ScrumLog.Api.Data.Entities;

public class Team
{
    public Guid Id { get; set; }

    public required string Name { get; set; }

    public ICollection<Person> Members { get; set; } = new List<Person>();

    public ICollection<Sprint> Sprints { get; set; } = new List<Sprint>();
}

namespace ScrumLog.Api.Data.Entities;

public class Sprint
{
    public Guid Id { get; set; }

    public required string Name { get; set; }

    public DateTime StartDate { get; set; }

    public DateTime EndDate { get; set; }

    public Guid TeamId { get; set; }

    public Team Team { get; set; } = null!;

    public ICollection<Meeting> Meetings { get; set; } = new List<Meeting>();
}

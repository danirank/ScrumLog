namespace ScrumLog.Api.Data.Entities;

public class DailyMeetingEntry
{
    public Guid Id { get; set; }

    public Guid MeetingId { get; set; }

    public Meeting Meeting { get; set; } = null!;

    public Guid PersonId { get; set; }

    public Person Person { get; set; } = null!;

    public required string Yesterday { get; set; }

    public required string Today { get; set; }

    public string? Blockers { get; set; }
}

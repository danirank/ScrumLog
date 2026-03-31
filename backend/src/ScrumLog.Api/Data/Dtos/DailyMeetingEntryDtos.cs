namespace ScrumLog.Api.Data.Dtos;

public class DailyMeetingEntryDto
{
    public Guid Id { get; set; }

    public Guid MeetingId { get; set; }

    public Guid PersonId { get; set; }

    public string Yesterday { get; set; } = string.Empty;

    public string Today { get; set; } = string.Empty;

    public string? Blockers { get; set; }
}

public class CreateDailyMeetingEntryDto
{
    public Guid MeetingId { get; set; }

    public Guid PersonId { get; set; }

    public string Yesterday { get; set; } = string.Empty;

    public string Today { get; set; } = string.Empty;

    public string? Blockers { get; set; }
}

public class UpdateDailyMeetingEntryDto
{
    public Guid MeetingId { get; set; }

    public Guid PersonId { get; set; }

    public string Yesterday { get; set; } = string.Empty;

    public string Today { get; set; } = string.Empty;

    public string? Blockers { get; set; }
}

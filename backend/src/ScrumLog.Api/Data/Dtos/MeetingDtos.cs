using ScrumLog.Api.Data.Entities;

namespace ScrumLog.Api.Data.Dtos;

public class MeetingDto
{
    public Guid Id { get; set; }

    public string Title { get; set; } = string.Empty;

    public DateTime Date { get; set; }

    public MeetingType Type { get; set; }

    public Guid SprintId { get; set; }

    public string? Notes { get; set; }

    public string? Decisions { get; set; }

    public string? Actions { get; set; }

    public List<Guid> ParticipantIds { get; set; } = [];

    public List<Guid> DailyMeetingEntryIds { get; set; } = [];
}

public class CreateMeetingDto
{
    public string Title { get; set; } = string.Empty;

    public DateTime Date { get; set; }

    public MeetingType Type { get; set; }

    public Guid SprintId { get; set; }

    public string? Notes { get; set; }

    public string? Decisions { get; set; }

    public string? Actions { get; set; }
}

public class UpdateMeetingDto
{
    public string Title { get; set; } = string.Empty;

    public DateTime Date { get; set; }

    public MeetingType Type { get; set; }

    public Guid SprintId { get; set; }

    public string? Notes { get; set; }

    public string? Decisions { get; set; }

    public string? Actions { get; set; }
}

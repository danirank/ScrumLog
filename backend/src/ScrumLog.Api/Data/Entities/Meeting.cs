namespace ScrumLog.Api.Data.Entities;

public class Meeting
{
    public Guid Id { get; set; }

    public required string Title { get; set; }

    public DateTime Date { get; set; }

    public MeetingType Type { get; set; }

    public Guid SprintId { get; set; }

    public Sprint Sprint { get; set; } = null!;

    public string? Notes { get; set; }

    public string? Decisions { get; set; }

    public string? Actions { get; set; }

    public ICollection<MeetingParticipant> Participants { get; set; } = new List<MeetingParticipant>();

    public ICollection<DailyMeetingEntry> DailyMeetingEntries { get; set; } = new List<DailyMeetingEntry>();
}

namespace ScrumLog.Api.Data.Entities;

public class Person
{
    public Guid Id { get; set; }

    public required string Name { get; set; }

    public required string Role { get; set; }

    public Guid TeamId { get; set; }

    public Team Team { get; set; } = null!;

    public ICollection<MeetingParticipant> MeetingParticipants { get; set; } = new List<MeetingParticipant>();

    public ICollection<DailyMeetingEntry> DailyMeetingEntries { get; set; } = new List<DailyMeetingEntry>();
}

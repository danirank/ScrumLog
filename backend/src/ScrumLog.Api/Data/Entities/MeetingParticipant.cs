namespace ScrumLog.Api.Data.Entities;

public class MeetingParticipant
{
    public Guid Id { get; set; }

    public Guid MeetingId { get; set; }

    public Meeting Meeting { get; set; } = null!;

    public Guid PersonId { get; set; }

    public Person Person { get; set; } = null!;
}

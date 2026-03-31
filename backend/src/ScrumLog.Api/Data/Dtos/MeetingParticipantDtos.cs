namespace ScrumLog.Api.Data.Dtos;

public class MeetingParticipantDto
{
    public Guid Id { get; set; }

    public Guid MeetingId { get; set; }

    public Guid PersonId { get; set; }
}

public class CreateMeetingParticipantDto
{
    public Guid MeetingId { get; set; }

    public Guid PersonId { get; set; }
}

public class UpdateMeetingParticipantDto
{
    public Guid MeetingId { get; set; }

    public Guid PersonId { get; set; }
}

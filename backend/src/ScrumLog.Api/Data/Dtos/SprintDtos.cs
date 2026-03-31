namespace ScrumLog.Api.Data.Dtos;

public class SprintDto
{
    public Guid Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public DateTime StartDate { get; set; }

    public DateTime EndDate { get; set; }

    public Guid TeamId { get; set; }

    public List<Guid> MeetingIds { get; set; } = [];
}

public class CreateSprintDto
{
    public string Name { get; set; } = string.Empty;

    public DateTime StartDate { get; set; }

    public DateTime EndDate { get; set; }

    public Guid TeamId { get; set; }
}

public class UpdateSprintDto
{
    public string Name { get; set; } = string.Empty;

    public DateTime StartDate { get; set; }

    public DateTime EndDate { get; set; }

    public Guid TeamId { get; set; }
}

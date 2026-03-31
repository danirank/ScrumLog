namespace ScrumLog.Api.Data.Dtos;

public class TeamDto
{
    public Guid Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public List<Guid> MemberIds { get; set; } = [];

    public List<Guid> SprintIds { get; set; } = [];
}

public class CreateTeamDto
{
    public string Name { get; set; } = string.Empty;
}

public class UpdateTeamDto
{
    public string Name { get; set; } = string.Empty;
}

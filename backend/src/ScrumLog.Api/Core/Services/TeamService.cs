using ScrumLog.Api.Data.Dtos;
using ScrumLog.Api.Data.Entities;
using ScrumLog.Api.Data.Interfaces;

namespace ScrumLog.Api.Core.Services;

public class TeamService(ICrudRepository<Team> repository) : CrudService<Team, TeamDto, CreateTeamDto, UpdateTeamDto>(repository)
{
    protected override Task<string?> ValidateCreateAsync(CreateTeamDto createDto)
    {
        return Task.FromResult<string?>(string.IsNullOrWhiteSpace(createDto.Name) ? "Team name is required." : null);
    }

    protected override Task<string?> ValidateUpdateAsync(Guid id, UpdateTeamDto updateDto)
    {
        return Task.FromResult<string?>(string.IsNullOrWhiteSpace(updateDto.Name) ? "Team name is required." : null);
    }

    protected override TeamDto MapToDto(Team entity)
    {
        return new TeamDto
        {
            Id = entity.Id,
            Name = entity.Name,
            MemberIds = entity.Members.Select(member => member.Id).ToList(),
            SprintIds = entity.Sprints.Select(sprint => sprint.Id).ToList()
        };
    }

    protected override Team MapCreateDtoToEntity(CreateTeamDto createDto)
    {
        return new Team
        {
            Id = Guid.NewGuid(),
            Name = createDto.Name.Trim()
        };
    }

    protected override void MapUpdateDtoToEntity(Team entity, UpdateTeamDto updateDto)
    {
        entity.Name = updateDto.Name.Trim();
    }
}

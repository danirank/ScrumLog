using ScrumLog.Api.Data.Dtos;
using ScrumLog.Api.Data.Entities;
using ScrumLog.Api.Data.Interfaces;

namespace ScrumLog.Api.Core.Services;

public class SprintService(
    ICrudRepository<Sprint> repository,
    ICrudRepository<Team> teamRepository) : CrudService<Sprint, SprintDto, CreateSprintDto, UpdateSprintDto>(repository)
{
    protected override async Task<string?> ValidateCreateAsync(CreateSprintDto createDto)
    {
        if (string.IsNullOrWhiteSpace(createDto.Name))
        {
            return "Sprint name is required.";
        }

        if (createDto.EndDate < createDto.StartDate)
        {
            return "Sprint end date must be on or after the start date.";
        }

        return await teamRepository.ExistsAsync(createDto.TeamId) ? null : "Team not found.";
    }

    protected override async Task<string?> ValidateUpdateAsync(Guid id, UpdateSprintDto updateDto)
    {
        if (string.IsNullOrWhiteSpace(updateDto.Name))
        {
            return "Sprint name is required.";
        }

        if (updateDto.EndDate < updateDto.StartDate)
        {
            return "Sprint end date must be on or after the start date.";
        }

        return await teamRepository.ExistsAsync(updateDto.TeamId) ? null : "Team not found.";
    }

    protected override SprintDto MapToDto(Sprint entity)
    {
        return new SprintDto
        {
            Id = entity.Id,
            Name = entity.Name,
            StartDate = entity.StartDate,
            EndDate = entity.EndDate,
            TeamId = entity.TeamId,
            MeetingIds = entity.Meetings.Select(meeting => meeting.Id).ToList()
        };
    }

    protected override Sprint MapCreateDtoToEntity(CreateSprintDto createDto)
    {
        return new Sprint
        {
            Id = Guid.NewGuid(),
            Name = createDto.Name.Trim(),
            StartDate = createDto.StartDate,
            EndDate = createDto.EndDate,
            TeamId = createDto.TeamId
        };
    }

    protected override void MapUpdateDtoToEntity(Sprint entity, UpdateSprintDto updateDto)
    {
        entity.Name = updateDto.Name.Trim();
        entity.StartDate = updateDto.StartDate;
        entity.EndDate = updateDto.EndDate;
        entity.TeamId = updateDto.TeamId;
    }
}

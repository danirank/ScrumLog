using ScrumLog.Api.Data.Dtos;
using ScrumLog.Api.Data.Entities;
using ScrumLog.Api.Data.Interfaces;

namespace ScrumLog.Api.Core.Services;

public class MeetingService(
    ICrudRepository<Meeting> repository,
    ICrudRepository<Sprint> sprintRepository) : CrudService<Meeting, MeetingDto, CreateMeetingDto, UpdateMeetingDto>(repository)
{
    protected override async Task<string?> ValidateCreateAsync(CreateMeetingDto createDto)
    {
        if (string.IsNullOrWhiteSpace(createDto.Title))
        {
            return "Meeting title is required.";
        }

        if (createDto.Type != MeetingType.General && !createDto.SprintId.HasValue)
        {
            return "Sprint is required for non-general meetings.";
        }

        if (createDto.SprintId.HasValue && !await sprintRepository.ExistsAsync(createDto.SprintId.Value))
        {
            return "Sprint not found.";
        }

        return null;
    }

    protected override async Task<string?> ValidateUpdateAsync(Guid id, UpdateMeetingDto updateDto)
    {
        if (string.IsNullOrWhiteSpace(updateDto.Title))
        {
            return "Meeting title is required.";
        }

        if (updateDto.Type != MeetingType.General && !updateDto.SprintId.HasValue)
        {
            return "Sprint is required for non-general meetings.";
        }

        if (updateDto.SprintId.HasValue && !await sprintRepository.ExistsAsync(updateDto.SprintId.Value))
        {
            return "Sprint not found.";
        }

        return null;
    }

    protected override MeetingDto MapToDto(Meeting entity)
    {
        return new MeetingDto
        {
            Id = entity.Id,
            Title = entity.Title,
            Date = entity.Date,
            Type = entity.Type,
            Status = entity.Status,
            SprintId = entity.SprintId,
            Notes = entity.Notes,
            Decisions = entity.Decisions,
            Actions = entity.Actions,
            ParticipantIds = entity.Participants.Select(participant => participant.PersonId).ToList(),
            DailyMeetingEntryIds = entity.DailyMeetingEntries.Select(entry => entry.Id).ToList()
        };
    }

    protected override Meeting MapCreateDtoToEntity(CreateMeetingDto createDto)
    {
        return new Meeting
        {
            Id = Guid.NewGuid(),
            Title = createDto.Title.Trim(),
            Date = createDto.Date,
            Type = createDto.Type,
            Status = MeetingStatus.Planned,
            SprintId = createDto.SprintId,
            Notes = createDto.Notes,
            Decisions = createDto.Decisions,
            Actions = createDto.Actions
        };
    }

    protected override void MapUpdateDtoToEntity(Meeting entity, UpdateMeetingDto updateDto)
    {
        entity.Title = updateDto.Title.Trim();
        entity.Date = updateDto.Date;
        entity.Type = updateDto.Type;
        entity.Status = updateDto.Status;
        entity.SprintId = updateDto.SprintId;
        entity.Notes = updateDto.Notes;
        entity.Decisions = updateDto.Decisions;
        entity.Actions = updateDto.Actions;
    }
}

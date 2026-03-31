using ScrumLog.Api.Data.Dtos;
using ScrumLog.Api.Data.Entities;
using ScrumLog.Api.Data.Interfaces;

namespace ScrumLog.Api.Core.Services;

public class DailyMeetingEntryService(
    ICrudRepository<DailyMeetingEntry> repository,
    ICrudRepository<Meeting> meetingRepository,
    ICrudRepository<Person> personRepository) : CrudService<DailyMeetingEntry, DailyMeetingEntryDto, CreateDailyMeetingEntryDto, UpdateDailyMeetingEntryDto>(repository)
{
    protected override async Task<string?> ValidateCreateAsync(CreateDailyMeetingEntryDto createDto)
    {
        if (string.IsNullOrWhiteSpace(createDto.Yesterday))
        {
            return "Yesterday is required.";
        }

        if (string.IsNullOrWhiteSpace(createDto.Today))
        {
            return "Today is required.";
        }

        if (!await meetingRepository.ExistsAsync(createDto.MeetingId))
        {
            return "Meeting not found.";
        }

        return await personRepository.ExistsAsync(createDto.PersonId) ? null : "Person not found.";
    }

    protected override async Task<string?> ValidateUpdateAsync(Guid id, UpdateDailyMeetingEntryDto updateDto)
    {
        if (string.IsNullOrWhiteSpace(updateDto.Yesterday))
        {
            return "Yesterday is required.";
        }

        if (string.IsNullOrWhiteSpace(updateDto.Today))
        {
            return "Today is required.";
        }

        if (!await meetingRepository.ExistsAsync(updateDto.MeetingId))
        {
            return "Meeting not found.";
        }

        return await personRepository.ExistsAsync(updateDto.PersonId) ? null : "Person not found.";
    }

    protected override DailyMeetingEntryDto MapToDto(DailyMeetingEntry entity)
    {
        return new DailyMeetingEntryDto
        {
            Id = entity.Id,
            MeetingId = entity.MeetingId,
            PersonId = entity.PersonId,
            Yesterday = entity.Yesterday,
            Today = entity.Today,
            Blockers = entity.Blockers
        };
    }

    protected override DailyMeetingEntry MapCreateDtoToEntity(CreateDailyMeetingEntryDto createDto)
    {
        return new DailyMeetingEntry
        {
            Id = Guid.NewGuid(),
            MeetingId = createDto.MeetingId,
            PersonId = createDto.PersonId,
            Yesterday = createDto.Yesterday.Trim(),
            Today = createDto.Today.Trim(),
            Blockers = createDto.Blockers
        };
    }

    protected override void MapUpdateDtoToEntity(DailyMeetingEntry entity, UpdateDailyMeetingEntryDto updateDto)
    {
        entity.MeetingId = updateDto.MeetingId;
        entity.PersonId = updateDto.PersonId;
        entity.Yesterday = updateDto.Yesterday.Trim();
        entity.Today = updateDto.Today.Trim();
        entity.Blockers = updateDto.Blockers;
    }
}

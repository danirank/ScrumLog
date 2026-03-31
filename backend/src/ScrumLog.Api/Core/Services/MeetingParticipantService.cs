using ScrumLog.Api.Data.Dtos;
using ScrumLog.Api.Data.Entities;
using ScrumLog.Api.Data.Interfaces;

namespace ScrumLog.Api.Core.Services;

public class MeetingParticipantService(
    ICrudRepository<MeetingParticipant> repository,
    ICrudRepository<Meeting> meetingRepository,
    ICrudRepository<Person> personRepository) : CrudService<MeetingParticipant, MeetingParticipantDto, CreateMeetingParticipantDto, UpdateMeetingParticipantDto>(repository)
{
    protected override async Task<string?> ValidateCreateAsync(CreateMeetingParticipantDto createDto)
    {
        if (!await meetingRepository.ExistsAsync(createDto.MeetingId))
        {
            return "Meeting not found.";
        }

        return await personRepository.ExistsAsync(createDto.PersonId) ? null : "Person not found.";
    }

    protected override async Task<string?> ValidateUpdateAsync(Guid id, UpdateMeetingParticipantDto updateDto)
    {
        if (!await meetingRepository.ExistsAsync(updateDto.MeetingId))
        {
            return "Meeting not found.";
        }

        return await personRepository.ExistsAsync(updateDto.PersonId) ? null : "Person not found.";
    }

    protected override MeetingParticipantDto MapToDto(MeetingParticipant entity)
    {
        return new MeetingParticipantDto
        {
            Id = entity.Id,
            MeetingId = entity.MeetingId,
            PersonId = entity.PersonId
        };
    }

    protected override MeetingParticipant MapCreateDtoToEntity(CreateMeetingParticipantDto createDto)
    {
        return new MeetingParticipant
        {
            Id = Guid.NewGuid(),
            MeetingId = createDto.MeetingId,
            PersonId = createDto.PersonId
        };
    }

    protected override void MapUpdateDtoToEntity(MeetingParticipant entity, UpdateMeetingParticipantDto updateDto)
    {
        entity.MeetingId = updateDto.MeetingId;
        entity.PersonId = updateDto.PersonId;
    }
}

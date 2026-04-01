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

        if (!await personRepository.ExistsAsync(createDto.PersonId))
        {
            return "Person not found.";
        }

        var existingParticipants = await Repository.GetAllAsync();
        var duplicateExists = existingParticipants.Any(participant =>
            participant.MeetingId == createDto.MeetingId && participant.PersonId == createDto.PersonId);

        return duplicateExists ? "Participant is already linked to this meeting." : null;
    }

    protected override async Task<string?> ValidateUpdateAsync(Guid id, UpdateMeetingParticipantDto updateDto)
    {
        if (!await meetingRepository.ExistsAsync(updateDto.MeetingId))
        {
            return "Meeting not found.";
        }

        if (!await personRepository.ExistsAsync(updateDto.PersonId))
        {
            return "Person not found.";
        }

        var existingParticipants = await Repository.GetAllAsync();
        var duplicateExists = existingParticipants.Any(participant =>
            participant.Id != id &&
            participant.MeetingId == updateDto.MeetingId &&
            participant.PersonId == updateDto.PersonId);

        return duplicateExists ? "Participant is already linked to this meeting." : null;
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

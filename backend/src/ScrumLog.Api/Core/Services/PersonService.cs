using ScrumLog.Api.Data.Dtos;
using ScrumLog.Api.Data.Entities;
using ScrumLog.Api.Data.Interfaces;

namespace ScrumLog.Api.Core.Services;

public class PersonService(
    ICrudRepository<Person> repository,
    ICrudRepository<Team> teamRepository) : CrudService<Person, PersonDto, CreatePersonDto, UpdatePersonDto>(repository)
{
    protected override async Task<string?> ValidateCreateAsync(CreatePersonDto createDto)
    {
        if (string.IsNullOrWhiteSpace(createDto.Name))
        {
            return "Person name is required.";
        }

        if (string.IsNullOrWhiteSpace(createDto.Role))
        {
            return "Person role is required.";
        }

        return await teamRepository.ExistsAsync(createDto.TeamId) ? null : "Team not found.";
    }

    protected override async Task<string?> ValidateUpdateAsync(Guid id, UpdatePersonDto updateDto)
    {
        if (string.IsNullOrWhiteSpace(updateDto.Name))
        {
            return "Person name is required.";
        }

        if (string.IsNullOrWhiteSpace(updateDto.Role))
        {
            return "Person role is required.";
        }

        return await teamRepository.ExistsAsync(updateDto.TeamId) ? null : "Team not found.";
    }

    protected override PersonDto MapToDto(Person entity)
    {
        return new PersonDto
        {
            Id = entity.Id,
            Name = entity.Name,
            Role = entity.Role,
            TeamId = entity.TeamId
        };
    }

    protected override Person MapCreateDtoToEntity(CreatePersonDto createDto)
    {
        return new Person
        {
            Id = Guid.NewGuid(),
            Name = createDto.Name.Trim(),
            Role = createDto.Role.Trim(),
            TeamId = createDto.TeamId
        };
    }

    protected override void MapUpdateDtoToEntity(Person entity, UpdatePersonDto updateDto)
    {
        entity.Name = updateDto.Name.Trim();
        entity.Role = updateDto.Role.Trim();
        entity.TeamId = updateDto.TeamId;
    }
}

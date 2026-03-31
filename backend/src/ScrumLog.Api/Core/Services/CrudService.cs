using ScrumLog.Api.Core.Interfaces;
using ScrumLog.Api.Core.Models;
using ScrumLog.Api.Data.Interfaces;

namespace ScrumLog.Api.Core.Services;

public abstract class CrudService<TEntity, TDto, TCreateDto, TUpdateDto>(
    ICrudRepository<TEntity> repository) : ICrudService<TDto, TCreateDto, TUpdateDto>
    where TEntity : class
{
    protected readonly ICrudRepository<TEntity> Repository = repository;

    public async Task<ServiceResponse<List<TDto>>> GetAllAsync()
    {
        var entities = await Repository.GetAllAsync();
        var dtos = entities.Select(MapToDto).ToList();
        return ServiceResponse<List<TDto>>.Ok(dtos);
    }

    public async Task<ServiceResponse<TDto>> GetByIdAsync(Guid id)
    {
        var entity = await Repository.GetByIdAsync(id);
        if (entity is null)
        {
            return ServiceResponse<TDto>.Fail("Entity not found.");
        }

        return ServiceResponse<TDto>.Ok(MapToDto(entity));
    }

    public async Task<ServiceResponse<TDto>> CreateAsync(TCreateDto createDto)
    {
        var validationError = await ValidateCreateAsync(createDto);
        if (validationError is not null)
        {
            return ServiceResponse<TDto>.Fail(validationError);
        }

        var entity = MapCreateDtoToEntity(createDto);
        var createdEntity = await Repository.AddAsync(entity);
        return ServiceResponse<TDto>.Ok(MapToDto(createdEntity));
    }

    public async Task<ServiceResponse<TDto>> UpdateAsync(Guid id, TUpdateDto updateDto)
    {
        var entity = await Repository.GetByIdAsync(id);
        if (entity is null)
        {
            return ServiceResponse<TDto>.Fail("Entity not found.");
        }

        var validationError = await ValidateUpdateAsync(id, updateDto);
        if (validationError is not null)
        {
            return ServiceResponse<TDto>.Fail(validationError);
        }

        MapUpdateDtoToEntity(entity, updateDto);
        var updatedEntity = await Repository.UpdateAsync(entity);
        return ServiceResponse<TDto>.Ok(MapToDto(updatedEntity));
    }

    public async Task<ServiceResponse<bool>> DeleteAsync(Guid id)
    {
        var deleted = await Repository.DeleteAsync(id);
        if (!deleted)
        {
            return ServiceResponse<bool>.Fail("Entity not found.");
        }

        return ServiceResponse<bool>.Ok(true);
    }

    protected virtual Task<string?> ValidateCreateAsync(TCreateDto createDto)
    {
        return Task.FromResult<string?>(null);
    }

    protected virtual Task<string?> ValidateUpdateAsync(Guid id, TUpdateDto updateDto)
    {
        return Task.FromResult<string?>(null);
    }

    protected abstract TDto MapToDto(TEntity entity);

    protected abstract TEntity MapCreateDtoToEntity(TCreateDto createDto);

    protected abstract void MapUpdateDtoToEntity(TEntity entity, TUpdateDto updateDto);
}

using ScrumLog.Api.Core.Models;

namespace ScrumLog.Api.Core.Interfaces;

public interface ICrudService<TDto, in TCreateDto, in TUpdateDto>
{
    Task<ServiceResponse<List<TDto>>> GetAllAsync();

    Task<ServiceResponse<TDto>> GetByIdAsync(Guid id);

    Task<ServiceResponse<TDto>> CreateAsync(TCreateDto createDto);

    Task<ServiceResponse<TDto>> UpdateAsync(Guid id, TUpdateDto updateDto);

    Task<ServiceResponse<bool>> DeleteAsync(Guid id);
}

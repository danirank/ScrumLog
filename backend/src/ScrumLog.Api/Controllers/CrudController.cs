using Microsoft.AspNetCore.Mvc;
using ScrumLog.Api.Core.Interfaces;
using ScrumLog.Api.Core.Models;
using Swashbuckle.AspNetCore.Annotations;

namespace ScrumLog.Api.Controllers;

[ApiController]
public abstract class CrudController<TDto, TCreateDto, TUpdateDto>(
    ICrudService<TDto, TCreateDto, TUpdateDto> service) : ControllerBase
{
    [HttpGet]
    [SwaggerOperation(Summary = "Get all records", Description = "Returns all records for the current entity.")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public virtual async Task<ActionResult<List<TDto>>> GetAll()
    {
        var response = await service.GetAllAsync();
        return ToActionResult(response);
    }

    [HttpGet("{id:guid}")]
    [SwaggerOperation(Summary = "Get record by id", Description = "Returns a single record by its identifier.")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public virtual async Task<ActionResult<TDto>> GetById(Guid id)
    {
        var response = await service.GetByIdAsync(id);
        return ToActionResult(response);
    }

    [HttpPost]
    [SwaggerOperation(Summary = "Create record", Description = "Creates a new record for the current entity.")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public virtual async Task<ActionResult<TDto>> Create([FromBody] TCreateDto createDto)
    {
        var response = await service.CreateAsync(createDto);
        if (!response.Success)
        {
            return BadRequest(response.ErrorMessage);
        }

        var createdDto = response.Data!;
        var id = createdDto.GetType().GetProperty("Id")?.GetValue(createdDto);
        return CreatedAtAction(nameof(GetById), new { id }, createdDto);
    }

    [HttpPut("{id:guid}")]
    [SwaggerOperation(Summary = "Update record", Description = "Updates an existing record by its identifier.")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public virtual async Task<ActionResult<TDto>> Update(Guid id, [FromBody] TUpdateDto updateDto)
    {
        var response = await service.UpdateAsync(id, updateDto);
        return ToActionResult(response);
    }

    [HttpDelete("{id:guid}")]
    [SwaggerOperation(Summary = "Delete record", Description = "Deletes an existing record by its identifier.")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public virtual async Task<ActionResult> Delete(Guid id)
    {
        var response = await service.DeleteAsync(id);
        if (!response.Success)
        {
            return NotFound(response.ErrorMessage);
        }

        return NoContent();
    }

    protected ActionResult<T> ToActionResult<T>(ServiceResponse<T> response)
    {
        if (response.Success)
        {
            return Ok(response.Data);
        }

        return response.ErrorMessage == "Entity not found."
            ? NotFound(response.ErrorMessage)
            : BadRequest(response.ErrorMessage);
    }
}

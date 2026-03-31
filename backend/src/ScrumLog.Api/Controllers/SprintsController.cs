using Microsoft.AspNetCore.Mvc;
using ScrumLog.Api.Core.Interfaces;
using ScrumLog.Api.Data.Dtos;
using Swashbuckle.AspNetCore.Annotations;

namespace ScrumLog.Api.Controllers;

[Route("api/[controller]")]
public class SprintsController(ICrudService<SprintDto, CreateSprintDto, UpdateSprintDto> service)
    : CrudController<SprintDto, CreateSprintDto, UpdateSprintDto>(service)
{
}

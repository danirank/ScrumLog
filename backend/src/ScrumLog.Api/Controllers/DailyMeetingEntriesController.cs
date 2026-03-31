using Microsoft.AspNetCore.Mvc;
using ScrumLog.Api.Core.Interfaces;
using ScrumLog.Api.Data.Dtos;
using Swashbuckle.AspNetCore.Annotations;

namespace ScrumLog.Api.Controllers;

[Route("api/[controller]")]
public class DailyMeetingEntriesController(ICrudService<DailyMeetingEntryDto, CreateDailyMeetingEntryDto, UpdateDailyMeetingEntryDto> service)
    : CrudController<DailyMeetingEntryDto, CreateDailyMeetingEntryDto, UpdateDailyMeetingEntryDto>(service)
{
}

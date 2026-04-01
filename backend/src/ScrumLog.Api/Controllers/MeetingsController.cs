using Microsoft.AspNetCore.Mvc;
using ScrumLog.Api.Core.Interfaces;
using ScrumLog.Api.Data.Dtos;
using Swashbuckle.AspNetCore.Annotations;

namespace ScrumLog.Api.Controllers;

[Route("api/[controller]")]
public class MeetingsController(
    ICrudService<MeetingDto, CreateMeetingDto, UpdateMeetingDto> service,
    IMeetingMarkdownExportService markdownExportService)
    : CrudController<MeetingDto, CreateMeetingDto, UpdateMeetingDto>(service)
{
    [HttpPost("export-markdown")]
    [SwaggerOperation(Summary = "Export meeting to markdown", Description = "Generates and saves a markdown file for meeting details.")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<MeetingMarkdownExportResultDto>> ExportMarkdown([FromBody] MeetingMarkdownExportRequestDto request)
    {
        var response = await markdownExportService.ExportAsync(request);
        if (!response.Success)
        {
            return response.ErrorMessage is "Failed to save markdown file."
                or "Markdown export output folder is not configured."
                or "Markdown export output folder is invalid."
                ? StatusCode(StatusCodes.Status500InternalServerError, response.ErrorMessage)
                : BadRequest(response.ErrorMessage);
        }

        return Ok(response.Data);
    }
}

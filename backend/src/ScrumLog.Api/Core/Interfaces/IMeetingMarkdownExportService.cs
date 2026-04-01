using ScrumLog.Api.Core.Models;
using ScrumLog.Api.Data.Dtos;

namespace ScrumLog.Api.Core.Interfaces;

public interface IMeetingMarkdownExportService
{
    Task<ServiceResponse<MeetingMarkdownExportResultDto>> ExportAsync(MeetingMarkdownExportRequestDto request);
}

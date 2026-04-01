using System.Text;
using Microsoft.Extensions.Options;
using ScrumLog.Api.Core.Interfaces;
using ScrumLog.Api.Core.Models;
using ScrumLog.Api.Data.Dtos;
using ScrumLog.Api.Data.Entities;

namespace ScrumLog.Api.Core.Services;

public class MeetingMarkdownExportService(
    IOptions<MarkdownExportSettings> settings) : IMeetingMarkdownExportService
{
    public async Task<ServiceResponse<MeetingMarkdownExportResultDto>> ExportAsync(MeetingMarkdownExportRequestDto request)
    {
        var validationError = ValidateRequest(request);
        if (validationError is not null)
        {
            return ServiceResponse<MeetingMarkdownExportResultDto>.Fail(validationError);
        }

        var outputFolder = settings.Value.OutputFolder?.Trim();
        if (string.IsNullOrWhiteSpace(outputFolder))
        {
            return ServiceResponse<MeetingMarkdownExportResultDto>.Fail("Markdown export output folder is not configured.");
        }

        string fullOutputFolderPath;

        try
        {
            fullOutputFolderPath = Path.GetFullPath(outputFolder);
            Directory.CreateDirectory(fullOutputFolderPath);
        }
        catch (Exception)
        {
            return ServiceResponse<MeetingMarkdownExportResultDto>.Fail("Markdown export output folder is invalid.");
        }

        var fileName = BuildFileName(request);
        var filePath = Path.Combine(fullOutputFolderPath, fileName);
        var markdown = BuildMarkdown(request);

        try
        {
            await File.WriteAllTextAsync(filePath, markdown, Encoding.UTF8);
        }
        catch (Exception)
        {
            return ServiceResponse<MeetingMarkdownExportResultDto>.Fail("Failed to save markdown file.");
        }

        return ServiceResponse<MeetingMarkdownExportResultDto>.Ok(new MeetingMarkdownExportResultDto
        {
            FileName = fileName,
            FilePath = filePath
        });
    }

    private static string? ValidateRequest(MeetingMarkdownExportRequestDto request)
    {
        if (string.IsNullOrWhiteSpace(request.Title))
        {
            return "Meeting title is required.";
        }

        if (string.IsNullOrWhiteSpace(request.TeamName))
        {
            return "Team name is required.";
        }

        if (request.Participants.Count == 0)
        {
            return "At least one participant is required.";
        }

        if (request.Participants.Any(string.IsNullOrWhiteSpace))
        {
            return "Participant names are required.";
        }

        if (request.MeetingType == MeetingType.Daily)
        {
            if (request.DailyEntries.Count == 0)
            {
                return "Daily meetings require daily entries.";
            }

            if (request.DailyEntries.Any(entry =>
                    string.IsNullOrWhiteSpace(entry.PersonName) ||
                    string.IsNullOrWhiteSpace(entry.Yesterday) ||
                    string.IsNullOrWhiteSpace(entry.Today)))
            {
                return "Daily entries require person name, yesterday, and today.";
            }
        }

        if (request.MeetingType == MeetingType.Review &&
            (string.IsNullOrWhiteSpace(request.Demonstrated) ||
             string.IsNullOrWhiteSpace(request.Completed) ||
             string.IsNullOrWhiteSpace(request.Feedback) ||
             string.IsNullOrWhiteSpace(request.FollowUpItems)))
        {
            return "Review meetings require demonstrated, completed, feedback, and follow-up items.";
        }

        if (request.MeetingType == MeetingType.Retrospective &&
            (string.IsNullOrWhiteSpace(request.WentWell) ||
             string.IsNullOrWhiteSpace(request.WentLessWell) ||
             string.IsNullOrWhiteSpace(request.Improvements)))
        {
            return "Retrospective meetings require went well, went less well, and improvements.";
        }

        return null;
    }

    private static string BuildFileName(MeetingMarkdownExportRequestDto request)
    {
        var sanitizedType = SanitizeFileNamePart(request.MeetingType.ToString());
        var sanitizedTitle = SanitizeFileNamePart(request.Title);
        return $"{request.Date:yyyy-MM-dd}_{sanitizedType}_{sanitizedTitle}.md";
    }

    private static string SanitizeFileNamePart(string value)
    {
        var invalidCharacters = Path.GetInvalidFileNameChars();
        var sanitized = new string(value
            .Trim()
            .ToLowerInvariant()
            .Select(character => invalidCharacters.Contains(character) ? '_' : character)
            .ToArray());

        sanitized = string.Join("_", sanitized
            .Split([' ', '-', '_'], StringSplitOptions.RemoveEmptyEntries));

        return string.IsNullOrWhiteSpace(sanitized) ? "meeting" : sanitized;
    }

    private static string BuildMarkdown(MeetingMarkdownExportRequestDto request)
    {
        var builder = new StringBuilder();

        builder.AppendLine($"# {request.Title.Trim()}");
        builder.AppendLine();
        builder.AppendLine($"- Type: {FormatMeetingType(request.MeetingType)}");
        builder.AppendLine($"- Date: {request.Date:yyyy-MM-dd}");
        builder.AppendLine($"- Team: {request.TeamName.Trim()}");
        builder.AppendLine($"- Sprint: {(string.IsNullOrWhiteSpace(request.SprintName) ? "N/A" : request.SprintName.Trim())}");
        builder.AppendLine();

        AppendListSection(builder, "Participants", request.Participants.Select(participant => participant.Trim()));
        AppendTextSection(builder, "Agenda", request.Agenda);
        AppendTextSection(builder, "Notes", request.Notes);
        AppendBulletSection(builder, "Decisions", request.Decisions);
        AppendBulletSection(builder, "Actions", request.Actions);

        if (request.MeetingType == MeetingType.Daily && request.DailyEntries.Count > 0)
        {
            builder.AppendLine("## Daily Entries");
            builder.AppendLine();

            foreach (var entry in request.DailyEntries)
            {
                builder.AppendLine($"### {entry.PersonName.Trim()}");
                builder.AppendLine($"- Yesterday: {entry.Yesterday.Trim()}");
                builder.AppendLine($"- Today: {entry.Today.Trim()}");
                builder.AppendLine($"- Blockers: {(string.IsNullOrWhiteSpace(entry.Blockers) ? "None" : entry.Blockers.Trim())}");
                builder.AppendLine();
            }
        }

        AppendTextSection(builder, "Demonstrated", request.Demonstrated);
        AppendTextSection(builder, "Completed", request.Completed);
        AppendTextSection(builder, "Feedback", request.Feedback);
        AppendTextSection(builder, "Follow-up Items", request.FollowUpItems);
        AppendTextSection(builder, "Went Well", request.WentWell);
        AppendTextSection(builder, "Went Less Well", request.WentLessWell);
        AppendTextSection(builder, "Improvements", request.Improvements);

        return builder.ToString().TrimEnd() + Environment.NewLine;
    }

    private static string FormatMeetingType(MeetingType meetingType)
    {
        return meetingType switch
        {
            MeetingType.Daily => "Daily",
            MeetingType.Review => "Review",
            MeetingType.Retrospective => "Retrospective",
            MeetingType.SprintPlanning => "Sprint Planning",
            _ => "General"
        };
    }

    private static void AppendTextSection(StringBuilder builder, string heading, string? value)
    {
        if (string.IsNullOrWhiteSpace(value))
        {
            return;
        }

        builder.AppendLine($"## {heading}");
        builder.AppendLine(value.Trim());
        builder.AppendLine();
    }

    private static void AppendListSection(StringBuilder builder, string heading, IEnumerable<string> values)
    {
        var items = values.Where(value => !string.IsNullOrWhiteSpace(value)).ToList();
        if (items.Count == 0)
        {
            return;
        }

        builder.AppendLine($"## {heading}");
        foreach (var item in items)
        {
            builder.AppendLine($"- {item}");
        }
        builder.AppendLine();
    }

    private static void AppendBulletSection(StringBuilder builder, string heading, string? value)
    {
        if (string.IsNullOrWhiteSpace(value))
        {
            return;
        }

        var lines = value
            .Split(['\r', '\n'], StringSplitOptions.RemoveEmptyEntries)
            .Select(line => line.Trim())
            .Where(line => line.Length > 0)
            .ToList();

        if (lines.Count == 0)
        {
            return;
        }

        builder.AppendLine($"## {heading}");
        foreach (var line in lines)
        {
            builder.AppendLine($"- {line}");
        }
        builder.AppendLine();
    }
}

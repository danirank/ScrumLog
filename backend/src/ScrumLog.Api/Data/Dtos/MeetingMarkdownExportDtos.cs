using ScrumLog.Api.Data.Entities;

namespace ScrumLog.Api.Data.Dtos;

public class MeetingMarkdownExportRequestDto
{
    public string Title { get; set; } = string.Empty;

    public MeetingType MeetingType { get; set; }

    public DateTime Date { get; set; }

    public string TeamName { get; set; } = string.Empty;

    public string? SprintName { get; set; }

    public List<string> Participants { get; set; } = [];

    public string? Agenda { get; set; }

    public string? Notes { get; set; }

    public string? Decisions { get; set; }

    public string? Actions { get; set; }

    public List<MeetingMarkdownDailyEntryRequestDto> DailyEntries { get; set; } = [];

    public string? Demonstrated { get; set; }

    public string? Completed { get; set; }

    public string? Feedback { get; set; }

    public string? FollowUpItems { get; set; }

    public string? WentWell { get; set; }

    public string? WentLessWell { get; set; }

    public string? Improvements { get; set; }
}

public class MeetingMarkdownDailyEntryRequestDto
{
    public string PersonName { get; set; } = string.Empty;

    public string Yesterday { get; set; } = string.Empty;

    public string Today { get; set; } = string.Empty;

    public string? Blockers { get; set; }
}

public class MeetingMarkdownExportResultDto
{
    public string FileName { get; set; } = string.Empty;

    public string FilePath { get; set; } = string.Empty;
}

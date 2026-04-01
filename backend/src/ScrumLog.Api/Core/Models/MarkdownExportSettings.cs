namespace ScrumLog.Api.Core.Models;

public class MarkdownExportSettings
{
    public const string SectionName = "MarkdownExport";

    public string OutputFolder { get; set; } = string.Empty;
}

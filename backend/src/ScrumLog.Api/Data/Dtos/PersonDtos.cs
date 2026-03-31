namespace ScrumLog.Api.Data.Dtos;

public class PersonDto
{
    public Guid Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public string Role { get; set; } = string.Empty;

    public Guid TeamId { get; set; }
}

public class CreatePersonDto
{
    public string Name { get; set; } = string.Empty;

    public string Role { get; set; } = string.Empty;

    public Guid TeamId { get; set; }
}

public class UpdatePersonDto
{
    public string Name { get; set; } = string.Empty;

    public string Role { get; set; } = string.Empty;

    public Guid TeamId { get; set; }
}

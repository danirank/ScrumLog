namespace ScrumLog.Api.Core.Models;

public class ServiceResponse<T>
{
    public bool Success { get; private set; }

    public string? ErrorMessage { get; private set; }

    public T? Data { get; private set; }

    public static ServiceResponse<T> Ok(T data)
    {
        return new ServiceResponse<T>
        {
            Success = true,
            Data = data
        };
    }

    public static ServiceResponse<T> Fail(string errorMessage)
    {
        return new ServiceResponse<T>
        {
            Success = false,
            ErrorMessage = errorMessage
        };
    }
}

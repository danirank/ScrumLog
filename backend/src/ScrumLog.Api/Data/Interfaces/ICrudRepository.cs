namespace ScrumLog.Api.Data.Interfaces;

public interface ICrudRepository<TEntity>
    where TEntity : class
{
    Task<List<TEntity>> GetAllAsync();

    Task<TEntity?> GetByIdAsync(Guid id);

    Task<TEntity> AddAsync(TEntity entity);

    Task<TEntity> UpdateAsync(TEntity entity);

    Task<bool> DeleteAsync(Guid id);

    Task<bool> ExistsAsync(Guid id);
}

using Microsoft.EntityFrameworkCore;
using ScrumLog.Api.Data.Interfaces;

namespace ScrumLog.Api.Data.Repositorys;

public class CrudRepository<TEntity>(ScrumLogDbContext dbContext) : ICrudRepository<TEntity>
    where TEntity : class
{
    protected readonly ScrumLogDbContext DbContext = dbContext;

    protected virtual IQueryable<TEntity> Query()
    {
        return DbContext.Set<TEntity>();
    }

    public virtual async Task<List<TEntity>> GetAllAsync()
    {
        return await Query().ToListAsync();
    }

    public virtual async Task<TEntity?> GetByIdAsync(Guid id)
    {
        return await Query().FirstOrDefaultAsync(entity => EF.Property<Guid>(entity, "Id") == id);
    }

    public virtual async Task<TEntity> AddAsync(TEntity entity)
    {
        DbContext.Set<TEntity>().Add(entity);
        await DbContext.SaveChangesAsync();
        return entity;
    }

    public virtual async Task<TEntity> UpdateAsync(TEntity entity)
    {
        DbContext.Set<TEntity>().Update(entity);
        await DbContext.SaveChangesAsync();
        return entity;
    }

    public virtual async Task<bool> DeleteAsync(Guid id)
    {
        var entity = await DbContext.Set<TEntity>().FindAsync(id);
        if (entity is null)
        {
            return false;
        }

        DbContext.Set<TEntity>().Remove(entity);
        await DbContext.SaveChangesAsync();
        return true;
    }

    public virtual async Task<bool> ExistsAsync(Guid id)
    {
        return await DbContext.Set<TEntity>().AnyAsync(entity => EF.Property<Guid>(entity, "Id") == id);
    }
}

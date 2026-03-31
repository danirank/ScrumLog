using Microsoft.EntityFrameworkCore;
using ScrumLog.Api.Data.Entities;

namespace ScrumLog.Api.Data.Repositorys;

public class SprintRepository(ScrumLogDbContext dbContext) : CrudRepository<Sprint>(dbContext)
{
    protected override IQueryable<Sprint> Query()
    {
        return DbContext.Sprints
            .Include(sprint => sprint.Team)
            .Include(sprint => sprint.Meetings);
    }
}

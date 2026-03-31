using Microsoft.EntityFrameworkCore;
using ScrumLog.Api.Data.Entities;

namespace ScrumLog.Api.Data.Repositorys;

public class TeamRepository(ScrumLogDbContext dbContext) : CrudRepository<Team>(dbContext)
{
    protected override IQueryable<Team> Query()
    {
        return DbContext.Teams
            .Include(team => team.Members)
            .Include(team => team.Sprints);
    }
}

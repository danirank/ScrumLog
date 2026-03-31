using Microsoft.EntityFrameworkCore;
using ScrumLog.Api.Data.Entities;

namespace ScrumLog.Api.Data.Repositorys;

public class PersonRepository(ScrumLogDbContext dbContext) : CrudRepository<Person>(dbContext)
{
    protected override IQueryable<Person> Query()
    {
        return DbContext.Persons.Include(person => person.Team);
    }
}

using Microsoft.EntityFrameworkCore;
using ScrumLog.Api.Data.Entities;

namespace ScrumLog.Api.Data.Repositorys;

public class DailyMeetingEntryRepository(ScrumLogDbContext dbContext) : CrudRepository<DailyMeetingEntry>(dbContext)
{
    protected override IQueryable<DailyMeetingEntry> Query()
    {
        return DbContext.DailyMeetingEntries
            .Include(dailyMeetingEntry => dailyMeetingEntry.Meeting)
            .Include(dailyMeetingEntry => dailyMeetingEntry.Person);
    }
}

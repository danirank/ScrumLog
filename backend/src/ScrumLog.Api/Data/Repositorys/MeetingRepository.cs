using Microsoft.EntityFrameworkCore;
using ScrumLog.Api.Data.Entities;

namespace ScrumLog.Api.Data.Repositorys;

public class MeetingRepository(ScrumLogDbContext dbContext) : CrudRepository<Meeting>(dbContext)
{
    protected override IQueryable<Meeting> Query()
    {
        return DbContext.Meetings
            .Include(meeting => meeting.Sprint)
            .Include(meeting => meeting.Participants)
            .Include(meeting => meeting.DailyMeetingEntries);
    }
}

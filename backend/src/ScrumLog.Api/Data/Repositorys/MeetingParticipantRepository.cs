using Microsoft.EntityFrameworkCore;
using ScrumLog.Api.Data.Entities;

namespace ScrumLog.Api.Data.Repositorys;

public class MeetingParticipantRepository(ScrumLogDbContext dbContext) : CrudRepository<MeetingParticipant>(dbContext)
{
    protected override IQueryable<MeetingParticipant> Query()
    {
        return DbContext.MeetingParticipants
            .Include(meetingParticipant => meetingParticipant.Meeting)
            .Include(meetingParticipant => meetingParticipant.Person);
    }
}

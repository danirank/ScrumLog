using Microsoft.EntityFrameworkCore;
using ScrumLog.Api.Data.Entities;

namespace ScrumLog.Api.Data;

public class ScrumLogDbContext(DbContextOptions<ScrumLogDbContext> options) : DbContext(options)
{
    public DbSet<Team> Teams => Set<Team>();

    public DbSet<Person> Persons => Set<Person>();

    public DbSet<Sprint> Sprints => Set<Sprint>();

    public DbSet<Meeting> Meetings => Set<Meeting>();

    public DbSet<MeetingParticipant> MeetingParticipants => Set<MeetingParticipant>();

    public DbSet<DailyMeetingEntry> DailyMeetingEntries => Set<DailyMeetingEntry>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<MeetingParticipant>()
            .HasOne(meetingParticipant => meetingParticipant.Meeting)
            .WithMany(meeting => meeting.Participants)
            .HasForeignKey(meetingParticipant => meetingParticipant.MeetingId);

        modelBuilder.Entity<MeetingParticipant>()
            .HasOne(meetingParticipant => meetingParticipant.Person)
            .WithMany(person => person.MeetingParticipants)
            .HasForeignKey(meetingParticipant => meetingParticipant.PersonId);

        modelBuilder.Entity<DailyMeetingEntry>()
            .HasOne(dailyMeetingEntry => dailyMeetingEntry.Meeting)
            .WithMany(meeting => meeting.DailyMeetingEntries)
            .HasForeignKey(dailyMeetingEntry => dailyMeetingEntry.MeetingId);

        modelBuilder.Entity<DailyMeetingEntry>()
            .HasOne(dailyMeetingEntry => dailyMeetingEntry.Person)
            .WithMany(person => person.DailyMeetingEntries)
            .HasForeignKey(dailyMeetingEntry => dailyMeetingEntry.PersonId);
    }
}

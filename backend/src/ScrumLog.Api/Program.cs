using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi;
using ScrumLog.Api.Core.Interfaces;
using ScrumLog.Api.Core.Services;
using ScrumLog.Api.Data;
using ScrumLog.Api.Data.Dtos;
using ScrumLog.Api.Data.Entities;
using ScrumLog.Api.Data.Interfaces;
using ScrumLog.Api.Data.Repositorys;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.EnableAnnotations();
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "ScrumLog API",
        Version = "v1",
        Description = "API for managing teams, sprints, meetings, participants, and daily scrum entries."
    });
});
builder.Services.AddDbContext<ScrumLogDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddScoped<ICrudRepository<Team>, TeamRepository>();
builder.Services.AddScoped<ICrudRepository<Person>, PersonRepository>();
builder.Services.AddScoped<ICrudRepository<Sprint>, SprintRepository>();
builder.Services.AddScoped<ICrudRepository<Meeting>, MeetingRepository>();
builder.Services.AddScoped<ICrudRepository<MeetingParticipant>, MeetingParticipantRepository>();
builder.Services.AddScoped<ICrudRepository<DailyMeetingEntry>, DailyMeetingEntryRepository>();
builder.Services.AddScoped<ICrudService<TeamDto, CreateTeamDto, UpdateTeamDto>, TeamService>();
builder.Services.AddScoped<ICrudService<PersonDto, CreatePersonDto, UpdatePersonDto>, PersonService>();
builder.Services.AddScoped<ICrudService<SprintDto, CreateSprintDto, UpdateSprintDto>, SprintService>();
builder.Services.AddScoped<ICrudService<MeetingDto, CreateMeetingDto, UpdateMeetingDto>, MeetingService>();
builder.Services.AddScoped<ICrudService<MeetingParticipantDto, CreateMeetingParticipantDto, UpdateMeetingParticipantDto>, MeetingParticipantService>();
builder.Services.AddScoped<ICrudService<DailyMeetingEntryDto, CreateDailyMeetingEntryDto, UpdateDailyMeetingEntryDto>, DailyMeetingEntryService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "ScrumLog API v1");
    });
}

app.UseHttpsRedirection();

app.MapControllers();

app.Run();


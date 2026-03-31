# ScrumLog

ScrumLog is a Scrum meeting management application for planning sprints, organizing teams, and running meetings from planning to completion.

## Workflow

The application is built around a simple Scrum flow:

1. Create teams.
2. Add people and assign them to teams.
3. Create sprints for each team.
4. Plan meetings in advance with title, type, date, and optional sprint depending on meeting type.
5. Start a meeting to move it from `Planned` to `InProgress`.
6. Add participants and complete meeting details based on the selected meeting type.
7. Mark the meeting as `Completed` when the ceremony is finished.

Supported meeting types:
- General
- Daily
- Review
- Retrospective
- Sprint Planning

## Tech Stack

### Backend

- ASP.NET Core Web API
- Entity Framework Core
- SQL Server
- Swagger / Swashbuckle

Backend structure follows a clean layered approach:

- Controllers
- Services
- Repositories
- `DbContext`

### Frontend

- React
- TypeScript
- Vite
- React Router
- CSS Modules

The frontend is organized into:

- Pages
- Containers
- Components
- Services
- Types

## Project Structure

- [backend](/C:/Users/danie/.NetJourney/ScrumLog/backend) contains the ASP.NET Core API
- [frontend](/C:/Users/danie/.NetJourney/ScrumLog/frontend) contains the React application
- [ai](/C:/Users/danie/.NetJourney/ScrumLog/ai) contains local architecture and coding guidance

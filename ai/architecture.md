# Architecture

Project structure:

- backend
  - Api
    - Controllers
    - Core
      - Interfaces
      - Services
    - Data
      - Interfaces
      - Repositorys
      - Entities
      - Dtos
      - Constants
        - ErrorMessages
      - Migrations

- frontend
  - src
    - Components
    - Containers
    - Pages
    - Api
    - Services
    - Types

Rules:

- Backend
  - Controllers call services
  - Services call repository
  - Respository calls DbContext

- Frontend
  - Match api responses to backend
  - Create ui components with its own folder and css module
  - Container componetns should hold logic
  - Pages components should be routed bu react-router

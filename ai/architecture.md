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
  - React app 

Rules:
- Controllers call services
- Services call repository 
- Respository calls DbContext

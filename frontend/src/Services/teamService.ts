import { createCrudService } from './crudService';
import type { CreateTeamRequest, Team, UpdateTeamRequest } from '../Types/team';

export const teamService = createCrudService<Team, CreateTeamRequest, UpdateTeamRequest>('teams');

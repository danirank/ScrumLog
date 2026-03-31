import { createCrudService } from './crudService';
import type { CreateSprintRequest, Sprint, UpdateSprintRequest } from '../Types/sprint';

export const sprintService = createCrudService<Sprint, CreateSprintRequest, UpdateSprintRequest>('sprints');

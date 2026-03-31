import { createCrudService } from './crudService';
import type { CreatePersonRequest, Person, UpdatePersonRequest } from '../Types/person';

export const personService = createCrudService<Person, CreatePersonRequest, UpdatePersonRequest>('persons');

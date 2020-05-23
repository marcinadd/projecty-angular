import {ProjectRole} from './ProjectRole';
import {Team} from './Team';

export class Project {
  id: number;
  name: string;
//  tasks
  projectRoles: ProjectRole[];
  team: Team;
}

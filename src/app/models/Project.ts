import {ProjectRole} from './ProjectRole';

export class Project {
  id: number;
  name: string;
//  tasks
  projectRoles: ProjectRole[];
}

import {ProjectRole} from './ProjectRole';

export class User {
  id: number;
  username: string;
  projectRoles: ProjectRole[];
  avatar;
}

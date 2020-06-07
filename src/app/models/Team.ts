import {TeamRole} from './TeamRole';
import {Project} from './Project';

export class Team {
  id: number;
  name: string;
  teamRoles: TeamRole[];
  projects: Project[];
}

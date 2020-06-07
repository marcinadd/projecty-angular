import {Team} from './Team';
import {Project} from './Project';

export class ProjectsTeamData {
  // TeamRole id
  id: number;
  team: Team;
  projects: Project[];
  role: string;
}

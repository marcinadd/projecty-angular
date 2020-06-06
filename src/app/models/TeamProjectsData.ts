import {Project} from './Project';

export class TeamProjectsData {
  teamName: string;
  projects: Project[];
  isCurrentUserTeamManager: boolean;
}

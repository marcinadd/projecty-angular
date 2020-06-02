import {Component, OnInit} from '@angular/core';
import {TeamService} from '../../../services/team.service';
import {Team} from '../../../models/Team';
import {ActivatedRoute} from '@angular/router';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-manage-team',
  templateUrl: './manage-team.component.html',
  styleUrls: ['./manage-team.component.css']
})
export class ManageTeamComponent implements OnInit {
  teamId = Number(this.route.snapshot.paramMap.get('id'));
  team = new Team();
  eventsSubject: Subject<Team> = new Subject<Team>();

  constructor(
    private teamService: TeamService,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.teamService.getTeam(this.teamId).subscribe(team => {
      this.team = team;
      this.eventsSubject.next(team);
    });
  }

  onNameChanged(teamWithNameChanged: Team) {
    this.team = teamWithNameChanged;
  }
}

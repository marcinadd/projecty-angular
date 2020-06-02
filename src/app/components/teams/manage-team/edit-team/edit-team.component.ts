import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TeamService} from '../../../../services/team.service';
import {FormBuilder} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {Team} from '../../../../models/Team';

@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.css']
})
export class EditTeamComponent implements OnInit {
  @Input() team: Team;
  @Input() events: Observable<Team>;
  @Output() nameChanged = new EventEmitter<Team>();
  changeTeamDataForm;
  private eventsSubscription: Subscription;

  constructor(
    private teamService: TeamService,
    private formBuilder: FormBuilder
  ) {
    this.changeTeamDataForm = this.formBuilder.group({
      name: ''
    });
  }

  ngOnInit(): void {
    this.eventsSubscription = this.events.subscribe(team => this.onTeamDataLoaded(team));
  }

  onTeamDataLoaded(team: Team) {
    this.changeTeamDataForm.setValue(
      {name: team.name}
    );
  }


  onSubmitChangeTeamData(form) {
    this.teamService.patchTeam(this.team.id, form).subscribe(team => {
      this.nameChanged.emit(team);
    });
  }

  ngOnDestroy() {
    this.eventsSubscription.unsubscribe();
  }
}

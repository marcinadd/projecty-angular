import {Component, OnInit} from '@angular/core';
import {TeamService} from '../../../services/team.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-add-project-specified-team',
  templateUrl: './add-project-specified-team.component.html',
  styleUrls: ['./add-project-specified-team.component.css']
})
export class AddProjectSpecifiedTeamComponent implements OnInit {
  teamId = Number(this.route.snapshot.paramMap.get('id'));
  teamName = '';
  projectCreateForm;

  constructor(
    private teamService: TeamService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.teamService.getTeamName(this.teamId).subscribe(data => {
      this.teamName = data.name;
    });
    this.projectCreateForm = this.formBuilder.group({
      name: ''
    });
  }

  onSubmit(form) {
    this.teamService.addProjectToSpecifiedTeam(this.teamId, form).subscribe(project => {
      this.router.navigate(['/teams', this.teamId, 'projects']);
    });
  }
}

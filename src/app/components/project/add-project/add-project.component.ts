import {Component, OnInit} from '@angular/core';
import {ProjectService} from '../../../services/project.service';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
  projectCreateForm;

  constructor(
    private projectService: ProjectService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.projectCreateForm = this.formBuilder.group({
      name: '',
      usernames: []
    });
  }

  ngOnInit(): void {
  }

  onSubmit(values) {
    this.projectService.createProject(values).subscribe(() => {
      this.router.navigate(['/projects']);
    });
  }
}

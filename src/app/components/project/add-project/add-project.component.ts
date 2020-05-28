import {Component, OnInit, ViewChild} from '@angular/core';
import {ProjectService} from '../../../services/project.service';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {DynamicUsernamesFormComponent} from '../../dynamic-usernames-form/dynamic-usernames-form.component';
import {ProjectRoleService} from '../../../services/project-role.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
  projectCreateForm;

  @ViewChild(DynamicUsernamesFormComponent, {static: false})
  private usernamesComponent: DynamicUsernamesFormComponent;

  constructor(
    private projectService: ProjectService,
    private projectRoleService: ProjectRoleService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.projectCreateForm = this.formBuilder.group({
      name: ''
    });
  }

  ngOnInit(): void {
  }

  onSubmit(values) {
    const usernameArray = this.usernamesComponent.getUsernameArray();
    this.projectService.createProject({name: values.name, usernames: usernameArray}).subscribe(() => {
      this.router.navigate(['/projects']);
    });
  }
}

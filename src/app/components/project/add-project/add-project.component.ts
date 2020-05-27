import {Component, OnInit} from '@angular/core';
import {ProjectService} from '../../../services/project.service';
import {FormArray, FormBuilder} from '@angular/forms';
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
      usernames: new FormArray([])
    });
    this.addItem();
  }

  get f() {
    return this.projectCreateForm.controls;
  }

  get u() {
    return this.f.usernames as FormArray;
  }

  ngOnInit(): void {
  }

  onSubmit(values) {
    const usernameArray = [];
    values.usernames.forEach(value => {
      usernameArray.push(value.username);
    });
    this.projectService.createProject({name: values.name, usernames: usernameArray}).subscribe(() => {
      this.router.navigate(['/projects']);
    });
  }

  removeItem(position) {
    this.u.removeAt(position);
  }

  addItem() {
    this.u.push(this.formBuilder.group({username: ''}));
  }
}

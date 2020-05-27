import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-dynamic-usernames-form',
  templateUrl: './dynamic-usernames-form.component.html',
  styleUrls: ['./dynamic-usernames-form.component.css']
})
export class DynamicUsernamesFormComponent implements OnInit {
  usernamesForm;

  constructor(private formBuilder: FormBuilder) {
    this.usernamesForm = this.formBuilder.group({usernames: new FormArray([])});
    this.addItem();
  }

  get f() {
    return this.usernamesForm.controls;
  }

  get u() {
    return this.f.usernames as FormArray;
  }

  ngOnInit(): void {

  }

  removeItem(position) {
    this.u.removeAt(position);
  }

  addItem() {
    this.u.push(this.formBuilder.group({username: ''}));
  }

}

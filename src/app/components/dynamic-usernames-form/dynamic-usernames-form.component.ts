import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder} from '@angular/forms';
import {UserService} from '../../services/user.service';

class UsernameFormItem {
  username: string;
  autocomplete: any;
}


@Component({
  selector: 'app-dynamic-usernames-form',
  templateUrl: './dynamic-usernames-form.component.html',
  styleUrls: ['./dynamic-usernames-form.component.css']
})
export class DynamicUsernamesFormComponent implements OnInit {
  usernamesForm;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.usernamesForm = this.formBuilder.group({
      items: new FormArray([])
    });
    this.addItem();
  }

  get f() {
    return this.usernamesForm.controls;
  }

  get u() {
    return this.f.items as FormArray;
  }

  ngOnInit(): void {

  }

  removeItem(position) {
    this.u.removeAt(position);
  }

  addItem() {
    const usernameFormItem = new UsernameFormItem();
    usernameFormItem.username = '';
    usernameFormItem.autocomplete = [];
    this.u.push(this.formBuilder.group(usernameFormItem));
  }

  getUsernameArray() {
    const usernameArray = [];
    this.usernamesForm.value.items.forEach(value => {
      usernameArray.push(value.username);
    });
    return usernameArray[0];
  }

  onTextChanged(user) {
    const username = user.value.username;
    if (username.length >= 4) {
      this.userService.getUsernamesStartWith(username).subscribe(usernames => {
        user.patchValue({autocomplete: usernames.length > 0 ? [usernames] : []});
      });
    } else {
      user.patchValue({autocomplete: []});
    }
  }
}

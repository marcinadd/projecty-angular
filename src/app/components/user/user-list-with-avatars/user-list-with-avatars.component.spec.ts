import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UserListWithAvatarsComponent} from './user-list-with-avatars.component';

describe('UserListWithAvatarsComponent', () => {
  let component: UserListWithAvatarsComponent;
  let fixture: ComponentFixture<UserListWithAvatarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserListWithAvatarsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListWithAvatarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

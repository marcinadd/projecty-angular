import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ManageTeamRolesComponent} from './manage-team-roles.component';

describe('ManageTeamRolesComponent', () => {
  let component: ManageTeamRolesComponent;
  let fixture: ComponentFixture<ManageTeamRolesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ManageTeamRolesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageTeamRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

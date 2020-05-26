import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ManageAssignmentsComponent} from './manage-assignments.component';

describe('ManageAssignmentsComponent', () => {
  let component: ManageAssignmentsComponent;
  let fixture: ComponentFixture<ManageAssignmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ManageAssignmentsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAssignmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AddProjectSpecifiedTeamDialogComponent} from './add-project-specified-team-dialog.component';

describe('AddProjectSpecifiedTeamDialogComponent', () => {
  let component: AddProjectSpecifiedTeamDialogComponent;
  let fixture: ComponentFixture<AddProjectSpecifiedTeamDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddProjectSpecifiedTeamDialogComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProjectSpecifiedTeamDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

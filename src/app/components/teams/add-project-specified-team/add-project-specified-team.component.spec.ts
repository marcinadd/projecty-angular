import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AddProjectSpecifiedTeamComponent} from './add-project-specified-team.component';

describe('AddProjectSpecifiedTeamComponent', () => {
  let component: AddProjectSpecifiedTeamComponent;
  let fixture: ComponentFixture<AddProjectSpecifiedTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddProjectSpecifiedTeamComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProjectSpecifiedTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

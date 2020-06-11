import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ProjectRolesDialogComponent} from './project-roles-dialog.component';

describe('ProjectRolesDialogComponent', () => {
  let component: ProjectRolesDialogComponent;
  let fixture: ComponentFixture<ProjectRolesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectRolesDialogComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectRolesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

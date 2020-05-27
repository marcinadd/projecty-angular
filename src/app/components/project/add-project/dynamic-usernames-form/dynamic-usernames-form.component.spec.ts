import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DynamicUsernamesFormComponent} from './dynamic-usernames-form.component';

describe('DynamicUsernamesFormComponent', () => {
  let component: DynamicUsernamesFormComponent;
  let fixture: ComponentFixture<DynamicUsernamesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DynamicUsernamesFormComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicUsernamesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

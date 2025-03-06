import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeProjectLayoutComponent } from './employee-project-layout.component';

describe('EmployeeProjectLayoutComponent', () => {
  let component: EmployeeProjectLayoutComponent;
  let fixture: ComponentFixture<EmployeeProjectLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeProjectLayoutComponent]
    });
    fixture = TestBed.createComponent(EmployeeProjectLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

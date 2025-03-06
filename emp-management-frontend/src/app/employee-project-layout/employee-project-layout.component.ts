import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-project-layout',
  templateUrl: './employee-project-layout.component.html',
  styleUrls: ['./employee-project-layout.component.css']
})
export class EmployeeProjectLayoutComponent {
  constructor(private router: Router) {}

  
  goToEmployeeListPage(): void {
    this.router.navigate(['/employees']);
  }

  goToProjectListPage(): void {
    this.router.navigate(['/projects']);
  }
}

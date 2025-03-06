import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'emp-management-frontend';

  constructor(private router: Router) {}

  goToEmployees() {
    this.router.navigate(['/employees']);
  }

  goToProjects() {
    this.router.navigate(['/projects']);
  }
}

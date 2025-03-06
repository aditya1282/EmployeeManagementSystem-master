import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee.model';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  currentPage: number = 1;
  pageSize: number = 2;
  sortDirection: string = 'asc';
  sortColumn: string = 'id';

  constructor(private employeeService: EmployeeService, private router: Router) {}

  ngOnInit(): void {
    this.fetchEmployees();
  }

  fetchEmployees(): void {
    this.employeeService.getAllEmployee().subscribe(
      (employees: Employee[]) => {
        this.employees = employees;
      },
      (error) => {
        console.error('Error fetching employees:', error);
      }
    );
  }

  goToEmployeePage(): void {
    this.router.navigate(['/employees/new']);
  }

  getPaginatedEmployees(): Employee[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.employees.slice(startIndex, startIndex + this.pageSize);
  }

  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
  }

  sort(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    // Sort the employees based on the selected column and direction
    this.employees.sort((a, b) => {
      const aValue = a[column];
      const bValue = b[column];

      if (this.sortDirection === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });
  }

  // Function to get the appropriate sorting icon class
  getSortIcon(column: string): string {
    if (column === this.sortColumn) {
      return this.sortDirection === 'asc' ? 'fa fa-sort-asc' : 'fa fa-sort-desc';
    } else {
      return '';
    }
  }
}

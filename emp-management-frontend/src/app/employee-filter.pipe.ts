import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from './employee.model';

@Pipe({
  name: 'employeeFilter',
})
export class EmployeeFilterPipe implements PipeTransform {
  transform(
    employees: Employee[],
    searchTerm: string,
    sortColumn: string,
    sortDirection: string
  ): Employee[] {
    // Apply filtering based on the search term
    if (searchTerm.trim() === '') {
      return employees;
    } else {
      const filteredEmployees = employees.filter((employee) => {
        return (
          employee.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
          employee.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
          employee.mobile.toLowerCase().includes(searchTerm.toLowerCase()) ||
          employee.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });

      // Sort the filtered employees based on the selected column and direction
      return this.sortEmployees(filteredEmployees, sortColumn, sortDirection);
    }
  }

  private sortEmployees(
    employees: Employee[],
    sortColumn: string,
    sortDirection: string
  ): Employee[] {
    return employees.sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];

      if (sortDirection === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });
  }
}

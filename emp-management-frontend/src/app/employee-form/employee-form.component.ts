import { Component, OnInit, OnDestroy } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee.model';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit, OnDestroy {
  employee: Employee = new Employee();
  isFormValid: boolean = false;
  isEmployeeRegistered: boolean = false;
  responseMessage = '';
  responseMessageaftersaving = '';
  isEmployeeAlreadyExists: boolean = false;
  fieldErrors: { [key: string]: boolean } = {
    firstname: false,
    lastname: false,
    mobile: false,
    email: false
  };

  employees: Employee[] = []; 
  private mobileInputChanges = new Subject<string>();
  private unsubscribe$ = new Subject<void>();

  constructor(private employeeService: EmployeeService) {
    this.mobileInputChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((mobileNumber: string) => {
        let employee: Employee = new Employee();
        employee.mobile = mobileNumber;
        return this.employeeService.checkDuplicateMobile(employee);
      })
    ).subscribe((response: any) => {
      this.isEmployeeAlreadyExists = response?.exists;
      this.responseMessage = this.isEmployeeAlreadyExists ? 'Employee with the same mobile number already exists!' : '';
      this.validateForm();
    });
  }

  ngOnInit(): void {
    this.fetchEmployees(); 
    this.validateForm();
    this.validateMobile(); 
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
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

  validateForm(): void {
    this.fieldErrors['firstname'] = !this.employee.firstname;
    this.fieldErrors['lastname'] = !this.employee.lastname;
    this.fieldErrors['mobile'] = !this.employee.mobile;
    this.fieldErrors['email'] = !this.employee.email || !this.validateEmailFormat(this.employee.email);

    this.isFormValid = Object.values(this.fieldErrors).every((value) => !value) && !this.isEmployeeAlreadyExists;
  }

  validateEmailFormat(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  }

  validateFirstName(): void {
    this.validateForm();
  }

  validateLastName(): void {
    this.validateForm();
  }

  validateMobile(): void {
    this.mobileInputChanges.next(this.employee.mobile);
    if (!this.isEmployeeAlreadyExists) {
      this.responseMessage = '';
    }
    this.isEmployeeAlreadyExists = false;
    this.validateForm();
  }

  validateEmail(): void {
    this.validateForm();
  }

  checkForDuplicateEmployee(): void {
    if (!this.isEmployeeAlreadyExists && this.isFormValid) {
      this.saveEmployee();
    }
  }

  saveEmployee(): void {
    this.employeeService.createEmployee(this.employee).subscribe(
      (response) => {
        console.log('Employee saved successfully:', response);
        this.employee = new Employee();
        this.isEmployeeRegistered = true;
        this.responseMessageaftersaving = 'Employee saved successfully!';
        setTimeout(() => {
          this.isEmployeeRegistered = false;
          this.responseMessageaftersaving = '';
        }, 2000); // 2000 milliseconds = 2 seconds
      },
      (error) => {
        console.error('Error saving employee:', error);
      }
    );   
  }

}

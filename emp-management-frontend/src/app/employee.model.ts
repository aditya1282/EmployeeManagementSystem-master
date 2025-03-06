export class Employee {
  id!: number;
  firstname!: string;
  lastname!: string;
  mobile!: string;
  email!: string;
  database: any;
  [key: string]: any;

  constructor(firstname: string = '', lastname: string = '', mobile: string = '' , email: string = '') {
    this.firstname = firstname;
    this.lastname = lastname;
    this.mobile = mobile;
    this.email = email;
  }
}

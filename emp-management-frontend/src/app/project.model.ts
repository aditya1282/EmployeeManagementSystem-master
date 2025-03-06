export class Project {
    id!: number;
    name!: string;
  
    constructor(projectname: string = '') {
      this.name = projectname;
    }
  }
  
import { Component } from '@angular/core';
import { ProjectService } from '../project.service';
import { Project } from '../project.model';

@Component({
  selector: 'app-project',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectComponent {
  project: { name: string } = { name: '' };
  isFormValid: boolean = false;
  isProjectRegistered: boolean = false;
  responseMessageaftersaving: string = '';
  isProjectNameDuplicate: boolean = false;
  fieldErrors: { [key: string]: boolean } = {
    name: false, 
  };

  constructor(private projectService: ProjectService) {}

  validateProjectName(): void {
    this.fieldErrors['name'] = !this.project.name; 
    this.validateForm();
  }

  validateForm(): void {
    this.isFormValid = !this.fieldErrors['name'] && !this.isProjectNameDuplicate;
  }

  checkForDuplicateProjectName(): void {
    this.projectService.checkDuplicateProjectName(this.project.name).subscribe(
      (response: any) => {
        this.isProjectNameDuplicate = response.exists;
        this.responseMessageaftersaving = this.isProjectNameDuplicate ? 'Project name already exists!' : '';
        this.validateForm();
      },
      (error) => {
        console.error('Error checking duplicate project name:', error);
      }
    );
  }

  saveProject(): void {
    this.projectService.createProject(this.project).subscribe(
      (response) => {
        console.log('Project saved successfully:', response);
        this.project = { name: '' };
        this.isProjectRegistered = true;
        this.responseMessageaftersaving = 'Project saved successfully!';
        setTimeout(() => {
          this.isProjectRegistered = false;
          this.responseMessageaftersaving = '';
        }, 2000);
      },
      (error) => {
        console.error('Error saving project:', error);
      }
    );
  }
}

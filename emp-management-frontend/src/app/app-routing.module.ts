import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ProjectComponent } from './project-form/project-form.component';
import { EmployeeTableComponent } from './employee-table/employee-table.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ApplayoutComponent } from './applayout/applayout.component';
import { EmployeeProjectLayoutComponent } from './employee-project-layout/employee-project-layout.component';

const routes: Routes = [
  {
  path:'',
  component: ApplayoutComponent,
  children:[
    {
      path: 'employees',
      component: EmployeeProjectLayoutComponent,
      children: [
        { path: 'new', component: EmployeeFormComponent },
        { path: '', component: EmployeeListComponent }
      ]
    },
    {
      path: 'projects',
      component: EmployeeProjectLayoutComponent,
      children: [
        { path: 'new', component: ProjectComponent },
        { path: '', component: ProjectListComponent }
      ]
    },
  { path: '', redirectTo: '/employees', pathMatch: 'full' },
  { path: 'employees', component: EmployeeListComponent },
  { path: 'employees/new', component: EmployeeFormComponent },
  { path: 'projects/new', component: ProjectComponent },
  {path: 'projects', component: ProjectListComponent},
  { path: 'employee-table', component: EmployeeTableComponent } 
    ]
  }
];

@NgModule({
  imports: [
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

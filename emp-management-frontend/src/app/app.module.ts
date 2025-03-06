import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatSelectModule } from '@angular/material/select';
import { ProjectComponent } from './project-form/project-form.component';
import { EmployeeTableComponent } from './employee-table/employee-table.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ApplayoutComponent } from './applayout/applayout.component';
import { EmployeeProjectLayoutComponent } from './employee-project-layout/employee-project-layout.component';
import { EmployeeFilterPipe } from './employee-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeFormComponent,
    EmployeeListComponent,
    ProjectComponent,
    EmployeeTableComponent,
    ProjectListComponent,
    ApplayoutComponent,
    EmployeeProjectLayoutComponent,
    EmployeeFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgxPaginationModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

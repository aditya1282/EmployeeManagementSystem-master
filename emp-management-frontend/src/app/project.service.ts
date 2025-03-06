import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Project } from './project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = 'http://localhost:8080/projects'; 

  constructor(private http: HttpClient) {}

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }
  createProject(project: any): Observable<Project[]> {
    return this.http.post<any>(this.apiUrl, project).pipe(
      catchError(this.handleError)
    );
  }

  checkDuplicateProjectName(projectName: string): Observable<any> {
    const url = `${this.apiUrl}/check-duplicate-projectname`;
    return this.http.post<any>(url, { projectName }).pipe(
        catchError(this.handleError)
    );
}
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('HTTP error:', error);
    return throwError('Something went wrong. Please try again later.');
  }
}

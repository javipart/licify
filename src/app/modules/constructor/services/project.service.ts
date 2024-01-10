import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Project } from '../../../shared/models/project';
import { Subject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projects: Project[] = [];
  private successSubject = new Subject<void>();

  successSubject$ = this.successSubject.asObservable();
  constructor(
    private http: HttpClient
  ) { }


  private handleResponse(response: { success: boolean, data: Project[] }) {
    return response.success ? response.data : [];
  }

  private notifySuccess() {
    this.successSubject.next();
  }

  updateProject(id: string, data: any) {
    return this.http.put<{ success: boolean, data: Project[] }>(`${environment.apiUrl}/project/${id}`, data)
      .pipe(map(response => {
        const project = this.handleResponse(response);
        this.notifySuccess();
        return project;
      }));
  }

  createProject(data: Object) {
    return this.http.post<{ success: boolean, data: Project[] }>(`${environment.apiUrl}/project`, data)
      .pipe(map(response => {
        const project = this.handleResponse(response);
        this.notifySuccess();
        return project;
      }));
  }

  getProjects(id: string) {
    return this.http.get<{ success: boolean, data: Project[] }>(`${environment.apiUrl}/constructor/projects/${id}`)
      .pipe(map(response => {
        const projects = this.handleResponse(response);
        return projects;
      }));
  }
}

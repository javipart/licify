import { Injectable } from '@angular/core';
import { Project } from '../../../shared/models/project';
import { Subject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private successSubject = new Subject<void>();

  successSubject$ = this.successSubject.asObservable();
  constructor(
    private http: HttpClient,
  ) {}

  private handleResponse(response: { success: boolean, data: Project[] }) {
    return response.success ? response.data : [];
  }

  public notifySuccess() {
    this.successSubject.next();
  }

  getNewProjects(id: string) {
    return this.http.get<{ success: boolean, data: Project[] }>(`${environment.apiUrl}/provider/projects/${id}/not-applied`)
      .pipe(map(response => {
        const projects = this.handleResponse(response);
        return projects;
      }));
  }

  getAssignedProjects(id: string) {
    return this.http.get<{ success: boolean, data: Project[] }>(`${environment.apiUrl}/provider/projects/${id}`)
      .pipe(map(response => {
        const projects = this.handleResponse(response);
        return projects;
      }));
  }

  getAppliedProjects(id: string) {
    return this.http.get<{ success: boolean, data: Project[] }>(`${environment.apiUrl}/provider/projects/${id}/applied`)
      .pipe(map(response => {
        const projects = this.handleResponse(response);
        return projects;
      }));
  }
}

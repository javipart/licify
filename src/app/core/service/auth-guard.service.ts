import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { User } from '../../shared/models/user';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { jwtDecode } from 'jwt-decode';

interface Response {
  success: boolean,
  data: string,
}

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
    this.user = this.userSubject.asObservable();
  }

  private handleResponse(response: Response): any {
    return response.success ? response.data : [];
  }

  public get userValue() {
    return this.userSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<Response>(`${environment.apiUrl}/login`, {
      username,
      password,
    }).pipe(map(response => {
      const token: any = this.handleResponse(response).token;
      const user: User = jwtDecode(token);
      user.token = token;
      localStorage.setItem('user', JSON.stringify(user));
      this.userSubject.next(user);
      return user;
    }));
  }

  register(user: User) {
    return this.http.post<User>(`${environment.apiUrl}/user`, user)
      .pipe(map(user => {
        return user;
      }));
  }

  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }
}

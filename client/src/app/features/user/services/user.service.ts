import { Injectable } from '@angular/core';
import { environment } from '../../../core/environments';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { UserLoginDTO } from '../DTO/UserLoginDTO';
import { LoginResponseDTO } from '../DTO/LoginResponseDTO';
import { UserDTO } from '../DTO/UserDTO';
import { CreateUserDTO } from '../DTO/CreateUserDTO';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/api/users`;
  constructor(private http: HttpClient) {}

  getTokenPayload(): any | null {
    const token = localStorage.getItem('token');
    try {
      return token ? JSON.parse(atob(token.split('.')[1])) : null;
    } catch {
      return null;
    }
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;

    const payload = this.getTokenPayload();
    if (!payload) return false;

    const expiration = new Date(payload.exp * 1000);
    return expiration > new Date();
  }

  getUserRole(): string | null {
    return this.getTokenPayload()?.role ?? null;
  }
  getUserId(): string | null {
    return this.getTokenPayload()?.userId ?? null;
  }
  getUserEmail(): string | null {
    return this.getTokenPayload()?.sub ?? null;
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  login(credentials: UserLoginDTO): Observable<LoginResponseDTO> {
    return this.http
      .post<LoginResponseDTO>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap((res) => {
          localStorage.setItem('token', res.token);
        })
      );
  }

  getAllUsers(): Observable<UserDTO[]> {
    return this.http.get<UserDTO[]>(this.apiUrl);
  }

  getUserById(id: number): Observable<UserDTO> {
    return this.http.get<UserDTO>(`${this.apiUrl}/${id}`);
  }
  createUser(user: CreateUserDTO): Observable<UserDTO> {
    return this.http.post<UserDTO>(this.apiUrl, user);
  }
  updateUser(id: number, user: UserDTO): Observable<UserDTO> {
    return this.http.put<UserDTO>(`${this.apiUrl}/${id}`, user);
  }
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

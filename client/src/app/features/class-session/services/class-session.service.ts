import { Injectable } from '@angular/core';
import { environment } from '../../../core/environments';
import { HttpClient } from '@angular/common/http';
import { ClassSessionResponseDTO } from '../DTO/ClassSessionResponseDTO';
import { Observable } from 'rxjs';
import { ClassSessionRequestDTO } from '../DTO/ClassSessionRequestDTO';

@Injectable({
  providedIn: 'root'
})
export class ClassSessionService {
 private apiUrl = `${environment.apiUrl}/api/class-sessions`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<ClassSessionResponseDTO[]> {
    return this.http.get<ClassSessionResponseDTO[]>(this.apiUrl);
  }

  getById(id: number): Observable<ClassSessionResponseDTO> {
    return this.http.get<ClassSessionResponseDTO>(`${this.apiUrl}/${id}`);
  }

  create(dto: ClassSessionRequestDTO): Observable<ClassSessionResponseDTO> {
    return this.http.post<ClassSessionResponseDTO>(this.apiUrl, dto);
  }

  update(id: number, dto: ClassSessionRequestDTO): Observable<ClassSessionResponseDTO> {
    return this.http.put<ClassSessionResponseDTO>(`${this.apiUrl}/${id}`, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
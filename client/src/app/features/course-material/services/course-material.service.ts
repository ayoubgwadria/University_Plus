import { Injectable } from '@angular/core';
import { environment } from '../../../core/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CourseMaterialResponseDTO } from '../DTO/CourseMaterialResponseDTO';
import { CourseMaterialRequestDTO } from '../DTO/CourseMaterialRequestDTO';

@Injectable({
  providedIn: 'root'
})
export class CourseMaterialService {
  private apiUrl = `${environment.apiUrl}/api/course-materials`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<CourseMaterialResponseDTO[]> {
    return this.http.get<CourseMaterialResponseDTO[]>(this.apiUrl);
  }

  getById(id: number): Observable<CourseMaterialResponseDTO> {
    return this.http.get<CourseMaterialResponseDTO>(`${this.apiUrl}/${id}`);
  }

  create(dto: CourseMaterialRequestDTO): Observable<CourseMaterialResponseDTO> {
    return this.http.post<CourseMaterialResponseDTO>(this.apiUrl, dto);
  }

  update(id: number, dto: CourseMaterialRequestDTO): Observable<CourseMaterialResponseDTO> {
    return this.http.put<CourseMaterialResponseDTO>(`${this.apiUrl}/${id}`, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

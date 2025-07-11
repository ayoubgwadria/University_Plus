import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AcademicCalendarRequestDTO } from '../DTO/AcademicCalendarRequestDTO';
import { AcademicCalendarResponseDTO } from '../DTO/AcademicCalendarResponseDTO';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../core/environments';

@Injectable({
  providedIn: 'root'
})
export class AcademicCalendarService {
  private  apiUrl = `${environment.apiUrl}/api/academic-calendar`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<AcademicCalendarResponseDTO[]> {
    return this.http.get<AcademicCalendarResponseDTO[]>(this.apiUrl);
  }

  getById(id: number): Observable<AcademicCalendarResponseDTO> {
    return this.http.get<AcademicCalendarResponseDTO>(`${this.apiUrl}/${id}`);
  }

  create(request: AcademicCalendarRequestDTO): Observable<AcademicCalendarResponseDTO> {
    return this.http.post<AcademicCalendarResponseDTO>(this.apiUrl, request);
  }

  update(id: number, request: AcademicCalendarRequestDTO): Observable<AcademicCalendarResponseDTO> {
    return this.http.put<AcademicCalendarResponseDTO>(`${this.apiUrl}/${id}`, request);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

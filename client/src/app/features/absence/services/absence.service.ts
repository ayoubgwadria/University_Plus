import { Injectable } from '@angular/core';
import { environment } from '../../../core/environments';
import { HttpClient } from '@angular/common/http';
import { AbsenceResponseDTO } from '../DTO/AbsenceResponseDTO';
import { Observable } from 'rxjs';
import { AbsenceRequestDTO } from '../DTO/AbsenceRequestDTO';

@Injectable({
  providedIn: 'root'
})
export class AbsenceService {

  private  apiUrl = `${environment.apiUrl}/api/absences`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<AbsenceResponseDTO[]> {
    return this.http.get<AbsenceResponseDTO[]>(this.apiUrl);
  }

  getById(id: number): Observable<AbsenceResponseDTO> {
    return this.http.get<AbsenceResponseDTO>(`${this.apiUrl}/${id}`);
  }

  create(dto: AbsenceRequestDTO): Observable<AbsenceResponseDTO> {
    return this.http.post<AbsenceResponseDTO>(this.apiUrl, dto);
  }

  update(id: number, dto: AbsenceRequestDTO): Observable<AbsenceResponseDTO> {
    return this.http.put<AbsenceResponseDTO>(`${this.apiUrl}/${id}`, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  
}
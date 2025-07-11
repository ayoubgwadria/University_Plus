import { Injectable } from '@angular/core';
import { environment } from '../../../core/environments';
import { HttpClient } from '@angular/common/http';
import { GradeResponseDTO } from '../DTO/GradeResponseDTO';
import { Observable } from 'rxjs';
import { GradeRequestDTO } from '../DTO/GradeRequestDTO';

@Injectable({
  providedIn: 'root'
})
export class GradeService {

  private apiUrl = `${environment.apiUrl}/api/grades`;

  constructor(private http: HttpClient) {}

  getAllGrades(): Observable<GradeResponseDTO[]> {
    return this.http.get<GradeResponseDTO[]>(this.apiUrl);
  }

  getGradeById(id: number): Observable<GradeResponseDTO> {
    return this.http.get<GradeResponseDTO>(`${this.apiUrl}/${id}`);
  }

  createGrade(grade: GradeRequestDTO): Observable<GradeResponseDTO> {
    return this.http.post<GradeResponseDTO>(this.apiUrl, grade);
  }

  updateGrade(id: number, grade: GradeRequestDTO): Observable<GradeResponseDTO> {
    return this.http.put<GradeResponseDTO>(`${this.apiUrl}/${id}`, grade);
  }

  deleteGrade(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExamPlanningResponseDTO } from '../DTO/ExamPlanningResponseDTO';
import { Observable } from 'rxjs';
import { ExamPlanningRequestDTO } from '../DTO/ExamPlanningRequestDTO';
import { environment } from '../../../core/environments';

@Injectable({
  providedIn: 'root'
})
export class ExamPlanningService {

  private apiUrl = `${environment.apiUrl}/api/exam-plannings`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<ExamPlanningResponseDTO[]> {
    return this.http.get<ExamPlanningResponseDTO[]>(this.apiUrl);
  }

  getById(id: number): Observable<ExamPlanningResponseDTO> {
    return this.http.get<ExamPlanningResponseDTO>(`${this.apiUrl}/${id}`);
  }

  create(examPlanning: ExamPlanningRequestDTO): Observable<ExamPlanningResponseDTO> {
    return this.http.post<ExamPlanningResponseDTO>(this.apiUrl, examPlanning);
  }

  update(id: number, examPlanning: ExamPlanningRequestDTO): Observable<ExamPlanningResponseDTO> {
    return this.http.put<ExamPlanningResponseDTO>(`${this.apiUrl}/${id}`, examPlanning);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
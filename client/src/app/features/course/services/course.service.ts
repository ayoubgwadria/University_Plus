import { Injectable } from '@angular/core';
import { environment } from '../../../core/environments';
import { HttpClient } from '@angular/common/http';
import { CourseResponseDTO } from '../DTO/CourseResponseDTO';
import { Observable } from 'rxjs';
import { CourseRequestDTO } from '../DTO/CourseRequestDTO';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = `${environment.apiUrl}/api/courses`;

  constructor(private http: HttpClient) {}

  getAllCourses(): Observable<CourseResponseDTO[]> {
    return this.http.get<CourseResponseDTO[]>(this.apiUrl);
  }

  getCourseById(id: number): Observable<CourseResponseDTO> {
    return this.http.get<CourseResponseDTO>(`${this.apiUrl}/${id}`);
  }

  createCourse(course: CourseRequestDTO): Observable<CourseResponseDTO> {
    return this.http.post<CourseResponseDTO>(this.apiUrl, course);
  }

  updateCourse(id: number, course: CourseRequestDTO): Observable<CourseResponseDTO> {
    return this.http.put<CourseResponseDTO>(`${this.apiUrl}/${id}`, course);
  }

  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

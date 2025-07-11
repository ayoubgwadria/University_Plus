import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../core/environments';
import { Observable } from 'rxjs';
import { TaskRequestDTO } from '../DTO/TaskRequestDTO';
import { TaskResponseDTO } from '../DTO/TaskResponseDTO';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

    private apiUrl = `${environment.apiUrl}/api/tasks`;
  constructor(private http: HttpClient) {}

  
  getAllTasks(): Observable<TaskResponseDTO[]> {
    return this.http.get<TaskResponseDTO[]>(this.apiUrl);
  }

  getTaskById(id: number): Observable<TaskResponseDTO> {
    return this.http.get<TaskResponseDTO>(`${this.apiUrl}/${id}`);
  }
  createTask(task: TaskRequestDTO): Observable<TaskResponseDTO> {
    return this.http.post<TaskResponseDTO>(this.apiUrl, task);
  }
  updateTask(id: number, task: TaskRequestDTO): Observable<TaskResponseDTO> {
    return this.http.put<TaskResponseDTO>(`${this.apiUrl}/${id}`, task);
  }
  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

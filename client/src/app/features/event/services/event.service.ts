import { Injectable } from '@angular/core';
import { environment } from '../../../core/environments';
import { Observable } from 'rxjs';
import { EventResponseDTO } from '../DTO/EventResponseDTO';
import { EventRequestDTO } from '../DTO/EventRequestDTO';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private baseUrl = environment.apiUrl + '/api/events';

  constructor(private http: HttpClient) {}

  getAllEvents(): Observable<EventResponseDTO[]> {
    return this.http.get<EventResponseDTO[]>(this.baseUrl);
  }

  getEventById(id: number): Observable<EventResponseDTO> {
    return this.http.get<EventResponseDTO>(`${this.baseUrl}/${id}`);
  }

  createEvent(event: EventRequestDTO): Observable<EventResponseDTO> {
    return this.http.post<EventResponseDTO>(this.baseUrl, event);
  }

  updateEvent(id: number, event: EventRequestDTO): Observable<EventResponseDTO> {
    return this.http.put<EventResponseDTO>(`${this.baseUrl}/${id}`, event);
  }

  deleteEvent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

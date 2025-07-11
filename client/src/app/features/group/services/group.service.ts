import { Injectable } from '@angular/core';
import { environment } from '../../../core/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GroupRequestDTO } from '../DTO/GroupRequestDTO';
import { GroupResponseDTO } from '../DTO/GroupResponseDTO';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private apiUrl = `${environment.apiUrl}/api/groups`;

  constructor(private http: HttpClient) {}

  getAllGroups(): Observable<GroupResponseDTO[]> {
    return this.http.get<GroupResponseDTO[]>(this.apiUrl);
  }

  getGroupById(id: number): Observable<GroupResponseDTO> {
    return this.http.get<GroupResponseDTO>(`${this.apiUrl}/${id}`);
  }

  createGroup(group: GroupRequestDTO): Observable<GroupResponseDTO> {
    return this.http.post<GroupResponseDTO>(this.apiUrl, group);
  }

  updateGroup(id: number, group: GroupRequestDTO): Observable<GroupResponseDTO> {
    return this.http.put<GroupResponseDTO>(`${this.apiUrl}/${id}`, group);
  }

  deleteGroup(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

import { Injectable } from '@angular/core';
import { environment } from '../../../core/environments';
import { HttpClient } from '@angular/common/http';
import { DocumentResponseDTO } from '../DTO/DocumentResponseDTO';
import { Observable } from 'rxjs';
import { DocumentRequestDTO } from '../DTO/DocumentRequestDTO';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  private apiUrl = `${environment.apiUrl}/api/documents`;

  constructor(private http: HttpClient) {}

  getAllDocuments(): Observable<DocumentResponseDTO[]> {
    return this.http.get<DocumentResponseDTO[]>(this.apiUrl);
  }

  getDocumentById(id: number): Observable<DocumentResponseDTO> {
    return this.http.get<DocumentResponseDTO>(`${this.apiUrl}/${id}`);
  }

  createDocument(document: DocumentRequestDTO): Observable<DocumentResponseDTO> {
    return this.http.post<DocumentResponseDTO>(this.apiUrl, document);
  }

  updateDocument(id: number, document: DocumentRequestDTO): Observable<DocumentResponseDTO> {
    return this.http.put<DocumentResponseDTO>(`${this.apiUrl}/${id}`, document);
  }

  deleteDocument(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
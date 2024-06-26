import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataInterface } from './data-interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = '/api/POC_angular';

  constructor(private http: HttpClient) { }

  getData(): Observable<DataInterface[]> {
    return this.http.get<DataInterface[]>(this.apiUrl);
  }

  addData(formData: DataInterface): Observable<DataInterface> {
    return this.http.post<DataInterface>(this.apiUrl, formData);
  }

  deleteData(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}


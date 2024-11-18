import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export abstract class BaseService<T> {
  protected baseUrl: string;

  constructor(
    protected http: HttpClient,
    protected route: string
  ) {
    this.baseUrl = `${environment.apiUrl}/${route}`;
  }

  list(): Observable<T[]> {
    return this.http.get<T[]>(this.baseUrl);
  }

  get(id: number): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${id}`);
  }

  create(item: T): Observable<T> {
    return this.http.post<T>(this.baseUrl, item);
  }

  update(item: T): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${(item as any).id}`, item);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
} 
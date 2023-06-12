import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fornecedores } from './fornecedores';

@Injectable({
  providedIn: 'root',
})
export class FornecedoresService {
  url = 'http://localhost:8080/fornecedores';

  constructor(private http: HttpClient) {}

  getFornecedores(): Observable<Fornecedores[]> {
    return this.http.get<Fornecedores[]>(this.url);
  }

  save(fornecedores: Fornecedores): Observable<Fornecedores> {
    return this.http.post<Fornecedores>(this.url, fornecedores);
  }

  remove(fornecedores: Fornecedores): Observable<void> {
    return this.http.delete<void>(this.url + '/' + fornecedores.id);
  }

  edit(fornecedores: Fornecedores): Observable<Fornecedores> {
    return this.http.put<Fornecedores>(
      this.url + '/' + fornecedores.id,
      fornecedores
    );
  }
}

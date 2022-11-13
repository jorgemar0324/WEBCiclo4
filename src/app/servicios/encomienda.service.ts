import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EncomiendaModel } from '../modelos/encomienda.model';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class EncomiendaService {

  constructor(private http: HttpClient, private seguridadService: SeguridadService) {
      this.token = this.seguridadService.getToken();
  }

  url = "http://localhost:3000"
  token: string = ''

  store(encomienda: EncomiendaModel): Observable<EncomiendaModel> {
    return this.http.post<EncomiendaModel>(`${this.url}/encomiendas`, {
      descripcion: encomienda.descripcion,
      peso: encomienda.peso,
      tipo: encomienda.tipo,
      presentacion: encomienda.presentacion,
    });
  }

  getAll(): Observable<EncomiendaModel[]>{
    return this.http.get<EncomiendaModel[]>(`${this.url}/encomiendas`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

  update(encomienda: EncomiendaModel): Observable<EncomiendaModel> {
    return this.http.patch<EncomiendaModel>(`${this.url}/encomiendas/${encomienda.id}`, {
      descripcion: encomienda.descripcion,
      peso: encomienda.peso,
      tipo: encomienda.tipo,
      presentacion: encomienda.presentacion,
    }, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }

  delete(id: string): Observable<EncomiendaModel[]>{
    return this.http.delete<EncomiendaModel[]>(`${this.url}/encomiendas/${id}`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

  getWithId(id: string): Observable<EncomiendaModel>{
    return this.http.get<EncomiendaModel>(`${this.url}/encomiendas/${id}`,{
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

}

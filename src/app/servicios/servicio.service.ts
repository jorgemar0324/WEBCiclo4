import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServicioModel } from '../modelos/servicio.model';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  constructor(private http: HttpClient, private seguridadService: SeguridadService) { 
      this.token = this.seguridadService.getToken();
  }

  store(servicio: ServicioModel): Observable<ServicioModel> {
    return this.http.post<ServicioModel>(`${this.url}/usuarios`, {
      fecha: servicio.fecha,
      valor: servicio.valor,
      origen: servicio.origen,
      destino: servicio.destino,
      encomienda: servicio.encomienda
    });
  }

  getAll(): Observable<ServicioModel[]>{
    return this.http.get<ServicioModel[]>(`${this.url}/servicios`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

  update(servicio: ServicioModel): Observable<ServicioModel> {
    return this.http.patch<ServicioModel>(`${this.url}/servicios/${servicio.id}`, {
      fecha: servicio.fecha,
      valor: servicio.valor,
      origen: servicio.origen,
      destino: servicio.destino,
      encomienda: servicio.encomienda
    }, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    });
  }

  delete(id: string): Observable<ServicioModel[]>{
    return this.http.delete<ServicioModel[]>(`${this.url}/servicios/${id}`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

  getWithId(id: string): Observable<ServicioModel>{
    return this.http.get<ServicioModel>(`${this.url}/servicios/${id}`,{
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }



    url = "http://localhost:3000"
    token: string = ''
}

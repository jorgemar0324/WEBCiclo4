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

    url = "http://localhost:3000"
    token: string = ''
}

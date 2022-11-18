import { Component, OnInit } from '@angular/core';
import { ClienteModel } from 'src/app/modelos/cliente.model';
import { EncomiendaModel } from 'src/app/modelos/encomienda.model';
import { ServicioModel } from 'src/app/modelos/servicio.model';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { EncomiendaService } from 'src/app/servicios/encomienda.service';
import { ServicioService } from 'src/app/servicios/servicio.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.css']
})
export class GetComponent implements OnInit {

  constructor(private servicioService: ServicioService, private clienteService: ClienteService, private encomiendaService: EncomiendaService) { }

  listado: ServicioModel[] = []

  getAll(){
    this.servicioService.getAll().subscribe((data: ServicioModel[]) => {
      for (let index = 0; index < data.length; index++) {
        let clienteOrigen = this.clienteService.getWithId(String(data[index]['origen'])).subscribe((origenData: ClienteModel) => {
          console.log(origenData)
          data[index]['origen'] = String(origenData.departamento) + ',' + String(origenData.ciudad);      
        });
        let clienteDestino = this.clienteService.getWithId(String(data[index]['destino'])).subscribe((destinoData: ClienteModel) => {
          console.log(destinoData)
          data[index]['destino'] = String(destinoData.departamento) + ',' + String(destinoData.ciudad);      
        });
        
        let Encomineda = this.encomiendaService.getWithId(String(data[index]['encomienda'])).subscribe((encomiendaData: EncomiendaModel) => {
          console.log(encomiendaData)
          data[index]['encomienda'] = 'Encomienda de tipo: ' + String(encomiendaData.tipo);      
        });
      }

      this.listado = data
      console.log(data)
    })
  }
 
  delete(id?: any){
    console.log(id)
    Swal.fire({
      title: '¿Esta seguro de eliminar este registro?',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.servicioService.delete(id).subscribe((data: any) => {
          Swal.fire('¡Eliminado correctamente!', '', 'success')
          this.getAll();
        })
      }
    })
  }


  ngOnInit(): void {
    this.getAll()
  }

}

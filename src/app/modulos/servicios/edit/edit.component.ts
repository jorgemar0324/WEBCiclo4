import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteModel } from 'src/app/modelos/cliente.model';
import { EncomiendaModel } from 'src/app/modelos/encomienda.model';
import { ServicioModel } from 'src/app/modelos/servicio.model';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { EncomiendaService } from 'src/app/servicios/encomienda.service';
import { ServicioService } from 'src/app/servicios/servicio.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private servicioService: ServicioService,
    private router: Router,
    private route: ActivatedRoute,
    private clienteService: ClienteService,
    private encomiendaService: EncomiendaService) { }

  listadoClientes: ClienteModel[] = []
  listadoEncomiendas: EncomiendaModel[] = []

  id: string=''
  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"]
    this.getWithId(this.id);
  }

  fgValidacion = this.fb.group({
    id: ['', [Validators.required]],
    fecha: ['', [Validators.required]],
    valor: ['', [Validators.required]],
    origen: ['', [Validators.required]],
    destino: ['', [Validators.required]],
    encomienda: ['', [Validators.required]]
  });

  getWithId(id: string){
    this.servicioService.getWithId(id).subscribe((data: ServicioModel) => {
      console.log(data)
      this.fgValidacion.controls["id"].setValue(id)
      this.fgValidacion.controls["fecha"].setValue(data.fecha as string)
      this.fgValidacion.controls["valor"].setValue(data.valor as string)
      this.fgValidacion.controls["origen"].setValue(data.origen as string)
      this.fgValidacion.controls["destino"].setValue(data.destino as string)
      this.fgValidacion.controls["encomienda"].setValue(data.encomienda as string)
    })
  }

  edit(){
    let usuario = new ServicioModel();
    usuario.id = this.fgValidacion.controls["id"].value as string;
    usuario.fecha = this.fgValidacion.controls["fecha"].value as string;
    usuario.valor = this.fgValidacion.controls["valor"].value as string;
    usuario.origen = this.fgValidacion.controls["origen"].value as string;
    usuario.destino = this.fgValidacion.controls["destino"].value as string;
    usuario.encomienda = this.fgValidacion.controls["encomienda"].value as string;
 
    this.servicioService.update(usuario).subscribe((data: ServicioModel)=> {
      Swal.fire('Editado Correctamente!', '', 'success')
      this.router.navigate(['/servicios/get']);
    },
    (error: any) => {
      console.log(error)
      Swal.fire('Erorr al editar Servicio!', '', 'error')
    })
  }

}

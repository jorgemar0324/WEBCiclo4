import { Component, OnInit } from '@angular/core';
import { EncomiendaService } from 'src/app/servicios/encomienda.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EncomiendaModel } from 'src/app/modelos/encomienda.model';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private encomiendaService: EncomiendaService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  fgValidacion = this.fb.group({
    id: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
    peso: ['', [Validators.required]],
    tipo: ['', [Validators.required]],
    presentacion: ['', [Validators.required]],
  });

  id: string=''

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"]
    this.buscarRegistro(this.id);
  }

  buscarRegistro(id: string){
    this.encomiendaService.getWithId(id).subscribe((data: EncomiendaModel) => {
      console.log(data)
      let peso = data.peso as unknown as number;
      this.fgValidacion.controls["id"].setValue(id)
      this.fgValidacion.controls["descripcion"].setValue(data.descripcion as string)
      this.fgValidacion.controls["peso"].setValue(peso.toString())
      this.fgValidacion.controls["tipo"].setValue(data.tipo as string)
      this.fgValidacion.controls["presentacion"].setValue(data.presentacion as string)
    })
  }

  edit(){
    let encomienda = new EncomiendaModel();
    encomienda.id = this.fgValidacion.controls["id"].value as string;
    encomienda.descripcion = this.fgValidacion.controls["descripcion"].value as string;
    encomienda.peso = this.fgValidacion.controls["peso"].value as unknown as number;
    encomienda.tipo = this.fgValidacion.controls["tipo"].value as string;
    encomienda.presentacion = this.fgValidacion.controls["presentacion"].value as string;
 
    this.encomiendaService.update(encomienda).subscribe((data: EncomiendaModel)=> {
      Swal.fire('Editado Correctamente!', '', 'success')
      this.router.navigate(['/encomiendas/get']);
    },
    (error: any) => {
      console.log(error)
      Swal.fire('¡Error al editar encomienda!', '', 'error')
    })
  }

}

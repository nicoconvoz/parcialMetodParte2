import { ModalDomicilioComponent } from './../modal-domicilio/modal-domicilio.component';
import { Component, OnInit, Host, Input } from '@angular/core';
import { Domicilio } from 'src/app/modelo/domicilio';
import { ServiciodomicilioService } from 'src/app/servicios/serviciodomicilio.service';
import { TablapersonasComponent } from '../tablapersonas/tablapersonas.component';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-modal-tabladomicilio',
  templateUrl: './modal-tabladomicilio.component.html',
  styleUrls: ['./modal-tabladomicilio.component.css']
})
export class ModalTabladomicilioComponent implements OnInit {

  pageActual: number = 1;
  public domicilios: Domicilio[];
  indice: number;
  idP:number;
  indicePosicion:number;

  public domicilioSeleccionado: Domicilio = {
    id: 0,
    calle : '',
    numero : null,
    localidad : '',
    departamento : '',
    piso : '', 
    personaRelacionada: null
  };

  constructor(private servicio: ServiciodomicilioService, @Host() private tabla: TablapersonasComponent, private actRoute: ActivatedRoute) {

   }

   @Input() set id(valor: number) {
    if (valor) {
      this.getAllDomicilios(valor);
      this.idP=valor;
    }
  }

  ngOnInit() {
  
  }

  getAllDomicilios(id:number) {
    this.servicio.getAll(id).subscribe(res => {
      this.domicilios = res;
    },
      err => {
        alert('Error al traer todas los domicilios: ' + err);
      });
  }

  delete(domicilio: Domicilio) {
    const opcion = confirm('¿Desea eliminar este registro?');
    if (opcion === true) {
      this.servicio.delete(domicilio.id).subscribe(
        res => {
          alert('El registro fue eliminado con éxito');
          const indexDomicilio = this.domicilios.indexOf(domicilio);
          this.domicilios.splice(indexDomicilio, 1);
        },
        err => {
          alert('Error al eliminar el registro seleccionado: ' + err);
        });
    }
  }
  

  onPreUpdate(domicilio: Domicilio, indice: number) {
    this.domicilioSeleccionado = domicilio;
    this.indice = this.domicilios.indexOf(domicilio);
    this.indicePosicion = indice;
  }

  resetear(){
    this.domicilioSeleccionado = null;
  }

}

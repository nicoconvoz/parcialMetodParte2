import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/modelo/persona';
import { ServiciopersonaService } from 'src/app/servicios/serviciopersona.service';

@Component({
  selector: 'app-tablapersonas',
  templateUrl: './tablapersonas.component.html',
  styleUrls: ['./tablapersonas.component.css']
})
export class TablapersonasComponent implements OnInit {

  pageActual: number = 1;
  public personas: Persona[];
  indice: number;
  indicePosicion: number;

  public id: number;
  

  public personaSeleccionada: Persona = {
    id: 0,
    nombre:'',
    apellido:'',
    edad:null,
    dni:null
  };

  constructor(private servicioPersona: ServiciopersonaService) { }

  ngOnInit() {
    this.getAllPersonas();
  }

  getAllPersonas() {
    this.servicioPersona.getAll().subscribe(res => {
      this.personas = res;
    },
      err => {
        alert('Error al traer todas las personas: ' + err);
      });
  }

  delete(persona: Persona) {
    const opcion = confirm('¿Desea eliminar este registro?');
    if (opcion === true) {
      this.servicioPersona.delete(persona.id).subscribe(
        res => {
          alert('El registro fue eliminado con éxito');
          const indexPersona = this.personas.indexOf(persona);
          this.personas.splice(indexPersona, 1);
        },
        err => {
          alert('Error al eliminar el registro seleccionado: ' + err);
        });
    }
  }

  onPreUpdate(persona: Persona, indice: number) {
    this.personaSeleccionada = persona;
    this.indice = this.personas.indexOf(persona);
    this.indicePosicion = indice;
  }

  resetear(){
    this.personaSeleccionada = null;
  }

  abrirDom(id:number){
    this.id=id;
  }

}

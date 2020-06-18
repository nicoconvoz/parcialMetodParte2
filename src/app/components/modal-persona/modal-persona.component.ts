import { Component, OnInit, ViewChild, ElementRef, Host, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ServiciopersonaService } from 'src/app/servicios/serviciopersona.service';
import { TablapersonasComponent } from '../tablapersonas/tablapersonas.component';
import { Persona } from 'src/app/modelo/persona';

@Component({
  selector: 'app-modal-persona',
  templateUrl: './modal-persona.component.html',
  styleUrls: ['./modal-persona.component.css']
})

export class ModalPersonaComponent implements OnInit {

  @ViewChild('btnClose', { static: true }) btnClose: ElementRef;

  public formPersona: FormGroup;
  public persona: any;
  public edit = false;
  public indice: number;
  public indiceP: number;

  constructor(private servicio: ServiciopersonaService,
    @Host() private tabla: TablapersonasComponent,
    private formBuilder: FormBuilder) { }

  @Input() set indicePosicion(valor) {
    if (valor) {
      this.indiceP = valor;
    }
  }

  @Input() set personaSeleccionada(valor) {
    this.onBuild();
    if (valor) {
      this.persona = valor;
      this.formPersona.patchValue({
        id: valor.id,
        nombre: valor.nombre,
        apellido: valor.apellido,
        edad: valor.edad,
        dni: valor.dni
      });
      if (valor.id !== 0) {
        this.edit = true;
      } else {
        this.edit = false;
      }
    }
  }

  ngOnInit() {
    this.onBuild();
  }

  onBuild() {
    this.formPersona = this.formBuilder.group({
      id: null,
      nombre: new FormControl('', [Validators.required]),
      apellido: new FormControl('', [Validators.required]),
      edad: new FormControl('', [Validators.required, , Validators.pattern(/^[0-9]\d*$/)]),
      dni: new FormControl('', [Validators.required, , Validators.pattern(/^[0-9]\d*$/)])
    });
  }

  onSave(formPersona: FormGroup): void {
    if (formPersona.value.id === null) {
      // Add
      this.add(formPersona.value);
    } else {
      // Update
      this.update(formPersona.value);
    }
    this.btnClose.nativeElement.click();
    this.tabla.indice = null;
  }

  add(persona: Persona) {
    this.servicio.post(persona).subscribe(
      res => {
        this.tabla.personas.push(res);
      },
      err => {
        alert('Ocurrió un error al agregar la persona');
      }
    );
  }

  update(persona: Persona) {
    this.servicio.put(persona.id, persona).subscribe(
      res => {
        alert('La persona fue actualizada con éxito');
        this.tabla.personas.splice(this.indiceP, 1, persona);
        this.indiceP = null;
      },
      err => {
        alert('Ocurrió un error al actualizar persona');
      }
    );
    
  }

  onClose() {
    this.personaSeleccionada = null;
  }

}
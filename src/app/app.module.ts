import { ModalTabladomicilioComponent } from './components/modal-tabladomicilio/modal-tabladomicilio.component';
import { ServiciopersonaService } from './servicios/serviciopersona.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TablapersonasComponent } from './components/tablapersonas/tablapersonas.component';
import { HttpClientModule } from '@angular/common/http';
import { ModalPersonaComponent } from './components/modal-persona/modal-persona.component';
import { ModalDomicilioComponent } from './components/modal-domicilio/modal-domicilio.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    TablapersonasComponent,
    ModalTabladomicilioComponent,
    ModalPersonaComponent,
    ModalDomicilioComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ],
  providers: [ServiciopersonaService],
  bootstrap: [AppComponent]
})
export class AppModule { }

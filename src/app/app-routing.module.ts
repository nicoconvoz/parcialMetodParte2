import { ModalDomicilioComponent } from './components/modal-domicilio/modal-domicilio.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TablapersonasComponent } from './components/tablapersonas/tablapersonas.component';


const routes: Routes = [
  
  { path:'', component : TablapersonasComponent },
  { path:'domicilios/:id', component :  ModalDomicilioComponent},
  { path: '**', pathMatch: 'full', redirectTo: '' },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

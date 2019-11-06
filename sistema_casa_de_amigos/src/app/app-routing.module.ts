import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NoticiasListComponent } from './components/noticias-list/noticias-list.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { NoticiasUpsertComponent } from './components/noticias-upsert/noticias-upsert.component';
import { LoginComponent } from './components/login/login.component';
import { AcercaDeComponent }  from './components/acerca-de/acerca-de.component';
import { ContactenosComponent } from '../app/components/contactenos/contactenos.component';
import { ServiciosComponent } from '../app/components/servicios/servicios.component';
import { PrivateComponent } from '../app/components/private/private.component';
import { InfoUsuarioComponent } from '../app/components/info-usuario/info-usuario.component';
import { SitiosListComponent } from '../app/components/sitios-list/sitios-list.component';
import { SitioComponent } from '../app/components/sitio/sitio.component';
import { BuscarSitiosComponent } from '../app/components/buscar-sitios/buscar-sitios.component';
import { EditSitioComponent } from '../app/components/edit-sitio/edit-sitio.component';
import { SitioSeguidoComponent } from '../app/components/sitio-seguido/sitio-seguido.component'; 
import { AuthenticationGuard } from '../app/guards/authentication/authentication.guard'; 
import { AuthorizationGuard } from '../app/guards/authorization/authorization.guard'; 
import { FormsComponent } from '../app/componetsFeedback/forms/forms.component';
import { CampsComponent } from './componetsFeedback/camps/camps.component';
import { ViewDetailsFormComponent } from './componetsFeedback/view-details-form/view-details-form.component';
import { ViewCampComponetComponent } from './componetsFeedback/view-camp-componet/view-camp-componet.component';
import { ListQuestFormComponetComponent } from './componetsFeedback/list-quest-form-componet/list-quest-form-componet.component';

const routes: Routes = [
  { path: 'acerca-de', component: AcercaDeComponent },
  { path: 'contactenos', component: ContactenosComponent },
  { path: 'servicios', component: ServiciosComponent },
  { path: 'lista-noticias', component: NoticiasListComponent },
  { path: 'inicio', component: NoticiasListComponent },
  { path: 'formularios', component: FormsComponent},
  { path: 'view-details-form/:id', component: ViewDetailsFormComponent},
  { path: 'view-details-camp/:id', component: ViewCampComponetComponent},
  { path: 'view-list-quest-form/:id/:idcamp', component: ListQuestFormComponetComponent},
  { path: 'campamentos', component: CampsComponent},
  { path: 'login/:selector', component: LoginComponent},
  { path: 'loginIngresar/:selector', component: LoginComponent},
  { path: 'lista-sitios', component: SitiosListComponent},
  { path: 'buscar/:id', component: BuscarSitiosComponent},

  { path: 'private', component:PrivateComponent, canActivate:[AuthenticationGuard],children:[
    { path: 'informacion-usuario/:user', component: InfoUsuarioComponent},
    { path: 'sitio/:id', component: SitioComponent},
    { path: 'sitio-seguido/:id', component:SitioSeguidoComponent},
    { path: 'insertar-sitio', component:EditSitioComponent},
    { path: 'editar-noticia/:id', component: NoticiasUpsertComponent,
      canActivate: [AuthorizationGuard], data: {role: 'Editor'}},

    { path: 'insertar-noticias', component: NoticiasUpsertComponent,
      canActivate: [AuthorizationGuard], data: {role: 'Admin'}},

    { path: 'editar-sitio/:id', component: EditSitioComponent,
      canActivate: [AuthorizationGuard], data: {role: 'Editor'}},

    { path: 'usuarios', component: UsuariosComponent,
     canActivate: [AuthorizationGuard], data: {role: 'Admin'}},

  ]},
  { path: '**', pathMatch: 'full', redirectTo: 'inicio'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { DatePipe } from '@angular/common';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { DataStorageService  } from '../app/services/data-storage.service';
import { NoticiasListComponent } from './components/noticias-list/noticias-list.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NoticiasUpsertComponent } from './components/noticias-upsert/noticias-upsert.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { AcercaDeComponent } from './components/acerca-de/acerca-de.component';
import { ServiciosComponent } from './components/servicios/servicios.component';
import { ContactenosComponent } from './components/contactenos/contactenos.component';
import { DomSecurityPipe } from './pipes/dom-security/dom-security.pipe';
import { InfoUsuarioComponent } from './components/info-usuario/info-usuario.component';
import { SitiosListComponent } from './components/sitios-list/sitios-list.component';
import { SitioComponent } from './components/sitio/sitio.component';
import { BuscarSitiosComponent } from './components/buscar-sitios/buscar-sitios.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { EditSitioComponent } from './components/edit-sitio/edit-sitio.component';
import { HttpClientModule } from "@angular/common/http";
import { AngularFireModule } from '@angular/fire'; 
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { SitioSeguidoComponent } from './components/sitio-seguido/sitio-seguido.component'; 
import { AngularFireAuthModule } from '@angular/fire/auth';
import { PrivateComponent } from './components/private/private.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { Router, RouterModule } from '@angular/router';
import { FormsComponent } from './componetsFeedback/forms/forms.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    NoticiasListComponent,
    NoticiasUpsertComponent,
    LoginComponent,
    AcercaDeComponent,
    ServiciosComponent,
    ContactenosComponent,
    DomSecurityPipe,
    InfoUsuarioComponent,
    SitiosListComponent,
    SitioComponent,
    BuscarSitiosComponent,
    EditSitioComponent,
    SitioSeguidoComponent,
    PrivateComponent,
    UsuariosComponent,
    FormsComponent, 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    CarouselModule.forRoot(),
    AngularFontAwesomeModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    HttpClientModule,
    AngularFireModule.initializeApp(environment.fireBase),
    AngularFirestoreModule,
    AngularFireAuthModule
    // RouterModule.forRoot(routes,{scrollPositionRestoration:'enabled'})
  ],
  providers: [ DatePipe,DataStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../../services/data-storage.service';
import { Router } from '@angular/router';
import swal from 'sweetalert';
import { Observable } from 'rxjs';
import { SitioServiceService } from '../../services/sitiosServices/sitio-service.service';
import { UsuariosService } from '../../services/usuarios.service';
import { Sitio } from '../../interfaces/sitio.interface'; 
import { Usuario } from 'src/app/interfaces/heroes.interfaces';
import { LoginService } from '../../services/loginSeguro/login.service';

@Component({
  selector: 'app-sitios-list',
  templateUrl: './sitios-list.component.html',
  styleUrls: ['./sitios-list.component.css']
})
export class SitiosListComponent implements OnInit {
  sitios:any[] = [];
  sitios$:Observable<any>;
  userAdmin:boolean = false;
  userLogin:string = '';

  constructor(private router:Router,
              private sitioServiceService:SitioServiceService,
              private dataStorageService:DataStorageService,
              private loginService:LoginService,
              private usuariosService:UsuariosService
               ) {
   }

  ngOnInit() {

    this.sitios$ =  this.sitioServiceService.getAllSitios();
    this.sitios$.subscribe((UserData:Sitio[]) => {
      this.sitios = UserData;
          });

          this.userLogin = this.dataStorageService.getObjectValue('UserNow');
          this.usuariosService.getUsuarioByEmail( this.userLogin).subscribe( data => {
            let user:Usuario =  data[0];
            user.roles = this.dataStorageService.getObjectValue('roles');
            if(user.roles.includes('Admin')){
              this.userAdmin = true;
            }else{
              this.userAdmin = false;
            }
          })
  }
  
  buscarSitio(termino:string){
    this.router.navigate(['/buscar',termino]);
  }


  elininarSitio(sitio:Sitio){
    this.sitioServiceService.deleteSitio(sitio);
  }

  nuevoSitio(){
    this.router.navigate(['/private/insertar-sitio/']);
  }

  editarSitio(sitio:any){
     this.router.navigate(['/private/editar-sitio',sitio.id]);
  }

  seguirSitio(sitio:any){
    if(this.dataStorageService.getObjectValue("UserNow") != ''){    
      this.router.navigate(['/private/sitio-seguido/' + sitio.id]);
  }else{
    swal("Error", "Debe ingresar con un usuario valido", "error");        
    this.router.navigate(['/loginIngresar/0']);
    } 
  
  }


  vermas(id:string){
    this.router.navigate(['/private/sitio/'+ id]);
  }

}

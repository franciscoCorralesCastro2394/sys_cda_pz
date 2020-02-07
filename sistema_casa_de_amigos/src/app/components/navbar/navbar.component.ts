import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/loginSeguro/login.service';
import { DataStorageService } from '../../services/data-storage.service';
import { Observable } from 'rxjs';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  users$:Observable<any>;
  usuario_actual$:Observable<any>;
  isLogin:boolean;
  constructor(
              private router:Router,
              private login:LoginService,
              private dataStorageService:DataStorageService,
              private usuariosService:UsuariosService) { 
              this.getUsuario();
              }
  ngOnInit() {
    setInterval(this.setUsuarios,1000);
  }

  setUsuarios = () => {
    this.usuario_actual$ = this.dataStorageService.getObjectValue("UserNow");
  }

  getUsuario = () => {
    this.users$ = this.usuariosService.getAllUaurios();
    this.usuario_actual$ = this.dataStorageService.getObjectValue("UserNow");
  }


  getPermisos = (rol) => {
    for (var i = 0; i < rol.length; i++) {
      if (this.dataStorageService.getObjectValue("roles").includes(rol[i])){
        return true;
      }
    }
    return false;
  }

  logueado(email:String){
    this.router.navigate(['/private/informacion-usuario/'+email]);
  } 

  LoginOff(){
      this.dataStorageService.deleteObjValue("UserNow");
      this.dataStorageService.deleteObjValue("roles");
      this.login.logout();
      location.reload();
      //this.router.navigate(['lista-noticias']);
  }

   Ingresar(selector:number){
     if(selector == 0){
      this.router.navigate(['/loginIngresar/0']);
     }else{
      this.router.navigate(['/login/1']);
     }
   } 
}

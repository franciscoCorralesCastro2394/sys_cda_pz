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

  logueado(email:String){
    this.router.navigate(['/private/informacion-usuario/'+email]);
  } 

  LoginOff(){
      this.login.logout();
      this.dataStorageService.deleteObjValue("UserNow");
      this.dataStorageService.deleteObjValue("roles");
      this.router.navigate(['lista-noticias']);
  }

   Ingresar(selector:number){
     if(selector == 0){
      this.router.navigate(['/loginIngresar/0']);
     }else{
      this.router.navigate(['/login/1']);
     }
   } 
}

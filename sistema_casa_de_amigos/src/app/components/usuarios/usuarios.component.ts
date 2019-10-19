import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { Observable } from 'rxjs';
import { Usuario } from '../../interfaces/heroes.interfaces';
import swal from 'sweetalert';
import { Router } from '@angular/router';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  users$:Observable<any>;

  constructor( private usuariosService:UsuariosService,private router:Router ) {

    this.getUsuario();
   }
  ngOnInit() {
  }


  getUsuario = () => {
    this.users$ = this.usuariosService.getAllUaurios();
  }

  guardarCambios(user:Usuario,rol:string){
    user.roles = rol;
    if(user.roles.includes('Editor')){
      user.Editor = true;
    }else{
      user.Editor = false;
    }
    if(user.roles.includes('Admin')){
      user.Admin = true;
    }else{
      user.Admin = false;
    }
    this.usuariosService.saveUsuario(user);
    swal("Exito", "Se guardaron los datos", "success");      
    this.router.navigateByUrl('private/usuarios');
  }


  EliminarCambios(user:Usuario){
    this.usuariosService.deleteUsuario(user);
    swal("Exito", "Se eleminaron los datos", "success");  
    this.router.navigateByUrl('private/usuarios');
  }
}

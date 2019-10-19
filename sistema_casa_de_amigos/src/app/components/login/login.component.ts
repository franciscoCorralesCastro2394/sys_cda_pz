import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';
import { LoginService } from '../../services/loginSeguro/login.service';
import { DataStorageService } from '../../services/data-storage.service';
import { Usuario } from '../../interfaces/heroes.interfaces';
import swal from 'sweetalert';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formGroupLogin: FormGroup;
  formGroupRegister: FormGroup;
  selector:number = 0;
  users$:Observable<any>;
  users:Usuario[] = []; 
  constructor(private formBuilder:FormBuilder,  
              private router:Router,
              private activatedRoute:ActivatedRoute,
              private usuariosService:LoginService,
              private userS:UsuariosService,
              private dataStorageService:DataStorageService
   ) { 

    this.selector = this.activatedRoute.snapshot.params['selector'];
    this.iniciarLogin();
    this.iniciarRegister();
  }

  ngOnInit() {
    
   this.users$ = this.userS.getAllUaurios();    
   this.users$.subscribe((UserData:Usuario[]) => {
    this.users = UserData;
        });
  }


  loginSeguro(){
    if(this.formGroupLogin.valid){
      this.usuariosService.login(this.formGroupLogin.value.Identificacion,this.formGroupLogin.value.Pass);
    }else{
      swal("Usuario no existe", "Intente de nuevo", "error");
    }
   }

  iniciarLogin = () => {
    this.formGroupLogin = this.formBuilder.group({
       Identificacion: ['', [Validators.required]],
       Pass: ['', [Validators.required]]
    });
  }

  iniciarRegister = () => {
    this.formGroupRegister = this.formBuilder.group({
      FirstName: ['', [Validators.required]],
      LastName: ['', [Validators.required]],
      Email: ['', [Validators.required]],
      Phone: ['', [Validators.required]],
      pass: ['', [Validators.required]],
      ConfirmPassword: ['', [Validators.required]],
      Imagen: ['', [Validators.required]],
      Descripcion: ['', [Validators.required]]
    });
  }
  registrar = () => {
    if(this.formGroupRegister.valid){
       let roles:string = ''; 
        let usuarioNuevo:Usuario = { 
          ConfirmPassword: this.formGroupRegister.value.ConfirmPassword,
          Email : this.formGroupRegister.value.Email,
          FirstName : this.formGroupRegister.value.FirstName,
          Imagen : this.formGroupRegister.value.Imagen,
          LastName : this.formGroupRegister.value.LastName,
          Phone : this.formGroupRegister.value.Phone,
          pass : this.formGroupRegister.value.pass,
          roles : roles,
          Admin : false,
          Editor : false,
          id : '' 
        }
        this.usuariosService.register(usuarioNuevo);
        swal("Usuario Registrado", "Exito", "success");
        }else{
        swal("Error al registrar", "Formulario con errores", "error");
        }
      }

loginGoogle(){
  debugger
  this.usuariosService.loginGoogle()
  .then((res) => {
    this.userS.getUsuarioByEmail(res.user.email).subscribe(data => {
      if(data.length == 0){
        let usuarioNuevo:Usuario = {
          Email :  res.additionalUserInfo.profile['email'],
          FirstName : res.additionalUserInfo.profile['given_name'],
          LastName : res.additionalUserInfo.profile['family_name'],
          Imagen : res.additionalUserInfo.profile['picture'],
          ConfirmPassword : '',
          Phone : +res.user.phoneNumber,
          Admin : false,
          Editor :false,
          pass : '',
          roles: '',
          id : '',
          key$:res.user.email 
        }
        this.dataStorageService.setObjectValue("UserNow",res.user.email);
        this.userS.saveUsuario(usuarioNuevo);
        this.dataStorageService.setObjectValue("roles",usuarioNuevo.roles);
        this.router.navigate(['/private/informacion-usuario/' + res.user.email]);  
      }else{
        this.dataStorageService.setObjectValue("UserNow",res.user.email);
        this.dataStorageService.setObjectValue("roles",data[0].roles);
        this.router.navigate(['/private/informacion-usuario/' + res.user.email]);  
      }

    });
       
  }).catch(err => {
    swal("Error al ingresar", "Error", "error");
  })
}

loginFaceBook(){
  debugger
  this.usuariosService.loginFaceBook()
  .then((res) => {
    this.userS.getUsuarioByEmail(res.user.email).subscribe(data => {
      if(data.length == 0){
        let usuarioNuevo:Usuario = {
          Email :  res.additionalUserInfo.profile['email'],
          FirstName : res.additionalUserInfo.profile['first_name'],
          LastName : res.additionalUserInfo.profile['last_name'],
          Imagen : res.additionalUserInfo.profile['picture'].data['url'],
          ConfirmPassword : '',
          Phone : +res.user.phoneNumber,
          Admin : false,
          Editor :false,
          pass : '',
          roles: '',
          id : '',
          key$:res.user.email 
        }
        this.dataStorageService.setObjectValue("UserNow",res.user.email);
        this.userS.saveUsuario(usuarioNuevo);
        this.dataStorageService.setObjectValue("roles",usuarioNuevo.roles);
        this.router.navigate(['/private/informacion-usuario/' + res.user.email]);  
      }else{
        this.dataStorageService.setObjectValue("UserNow",res.user.email);
        this.dataStorageService.setObjectValue("roles",data[0].roles);
        this.router.navigate(['/private/informacion-usuario/' + res.user.email]);  
      }
    });
  }).catch(err => {
    swal("Error al ingresar", "Error", "error");
  });
}


}

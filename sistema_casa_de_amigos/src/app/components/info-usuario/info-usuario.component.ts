import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';
import { FeedbackFormServiceService } from '../../servicesFeedback/feedback-form-service.service';
import { Observable } from 'rxjs';
import { FormByCampByVolt, FormByCampByVolunt } from '../../interfaces/feedbackInterfaces';
import {Router} from '@angular/router';



@Component({
  selector: 'app-info-usuario',
  templateUrl: './info-usuario.component.html',
  styleUrls: ['./info-usuario.component.css'],
  providers: [FeedbackFormServiceService]
})
export class InfoUsuarioComponent implements OnInit {
  private forms$ : Observable<FormByCampByVolt[]>; 
  private forms_ : FormByCampByVolt[] = []; 
  private forms : FormByCampByVolt[] = []; 
  userId: string;
  users: any[] = [];
  userLogin: any;
  nombre: string;
  img: string;
  private formByCampByVolt: FormByCampByVolunt[] = [];

  
  constructor(private activatedRoute: ActivatedRoute,
    private usuariosService: UsuariosService,
    private formService:FeedbackFormServiceService,
    private router:Router) {
    this.userId = this.activatedRoute.snapshot.params['user'];
    this.cargarUsuario();
    this.getFormbyCampByUser();
  }
  ngOnInit() {
    this.getFormbyCampByUser();
  }

  getFormbyCampByUser(){
   this.forms$ = this.formService.getFormsById(this.userId);
  }

  cargarUsuario() {//car la infromacion del uaurio 
    this.usuariosService.getAllUaurios().subscribe(data => {
      this.users = data;
      this.users.forEach((user) => {
        if (user.Email === this.userId) {
          this.userLogin = user;
          this.nombre = this.userLogin.FirstName + '  ' + this.userLogin.LastName;
          this.img = this.userLogin.Imagen;
        }
      });
    });
  }

  formularioConcluido(idForm:string, idCamp:string){
    
  }


  realizarForm(idForm:string,idCamp:string){
    this.router.navigate(['view-list-quest-form',idForm,idCamp]);
  }



}

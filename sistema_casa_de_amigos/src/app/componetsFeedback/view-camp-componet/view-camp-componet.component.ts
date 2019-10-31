import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert'; 
import { DataStorageService } from 'src/app/services/data-storage.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import { camByVoluntInsert } from '../../interfaces/feedbackInterfaces';
import { Usuario } from '../../interfaces/heroes.interfaces';
import { campFeedback } from '../../interfaces/feedbackInterfaces';
import { Observable } from 'rxjs';
import { UsuariosService } from '../../services/usuarios.service';
import { ActivatedRoute } from '@angular/router';
import { FeedbackService } from '../../servicesFeedback/feedback.service';

@Component({
  selector: 'app-view-camp-componet',
  templateUrl: './view-camp-componet.component.html',
  styleUrls: ['./view-camp-componet.component.css'],
  providers: [FeedbackService]
})

export class ViewCampComponetComponent implements OnInit {
  users$:Observable<any>;
  users:any[] = [];
  userAsigToCamp:any[] = [];
  voluntByCamp:camByVoluntInsert[] = [];

  idCamp:number;
  campName:string;
  constructor(private router:Router,
              private usuariosService:UsuariosService,
              private activatedRoute:ActivatedRoute,
              private camps: FeedbackService) { }

  ngOnInit() {
    this.idCamp = this.activatedRoute.snapshot.params['id'];
    this.getUsuarios();
    this.getCampByID();
    this.getVoluntariosPorCamp();
  }


  getUsuarios = () => {//obtiene los usuarios del sistema 
    this.usuariosService.getAllUaurios().subscribe(resp =>{
      resp.forEach((user) => {
          if(user.roles.includes('Voluntario')){
           this.users.push(user);
          }
      });
    });
  }


  getCampByID = () => {//obtiene el campamento por el id
    this.camps.getCampById(this.idCamp).subscribe(resp => {
      this.campName = resp.camp_mane;
    });
  }


  selVoluntarioCamp(vol:Usuario){//manipula el arreglo de voluntarios 
    let indice = this.users.indexOf(vol);
    this.users.splice(indice,1);
    this.userAsigToCamp.push(vol);
  }

  getVoluntariosPorCamp = () =>{
    debugger
    this.camps.getVoluntPorCamp(this.idCamp).subscribe((response) => {
     this.voluntByCamp = response;
    });
  }


  eliminarVol(userAsig:Usuario){//manipula el arreglo de voluntarios asignados 
    let indice = this.userAsigToCamp.indexOf(userAsig);
    this.userAsigToCamp.splice(indice,1);
    this.users.push(userAsig);
  }

  guardarCambios(){//almacena la realción entre voluntarios y campamentos 
    this.userAsigToCamp.forEach((userByCamp) => {
       let volunt:camByVoluntInsert;
       volunt = {
        id_camp: this.idCamp,
        id_voluntier: userByCamp.Email
       };
      this.camps.insertVoluntierByCamp(volunt).subscribe((responce) => {
        if(responce){
          console.log(responce);
        }else{
          this.getUsuarios();
          this.getCampByID();
          swal("Error al  insertar un voluntario", "Error", "error");
         } 
      });
    });

    

  }

}

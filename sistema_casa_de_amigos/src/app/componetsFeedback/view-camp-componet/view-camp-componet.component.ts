import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { camByVoluntInsert } from '../../interfaces/feedbackInterfaces';
import { Usuario } from '../../interfaces/heroes.interfaces';
import { FormByCamp, formFeedBack} from '../../interfaces/feedbackInterfaces';
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
  private users$: Observable<any>;
  private users: any[] = [];
  private userAsigToCamp: any[] = [];
  private voluntByCamp: camByVoluntInsert[] = [];
  private formGroupAsigForm: FormGroup;  
  private idCamp: number;
  private campName: string;
  private user:string;
  private forms$ : Observable<formFeedBack[]>; 


  constructor(private router: Router,
    private dataStorageService:DataStorageService,
    private usuariosService: UsuariosService,
    private activatedRoute: ActivatedRoute,
    private formBuilder:FormBuilder,
    private camps: FeedbackService) { }

  ngOnInit() {
    this.idCamp = this.activatedRoute.snapshot.params['id'];
    this.getUsuarios();
    this.getCampByID();
    this.iniciarRegisterForm();
    this.getForms();
  }

  getUsuarios = () => {//obtiene los usuarios del sistema 
    this.usuariosService.getAllUaurios().subscribe(resp => {
      resp.forEach((user) => {
        if (user.roles.includes('Voluntario')) {
          this.users.push(user);
        }
      });
      this.getVoluntariosPorCamp();
    });
  }


  getCampByID = () => {//obtiene el campamento por el id
    this.camps.getCampById(this.idCamp).subscribe(resp => {
      this.campName = resp.camp_mane;
    });
  }


  selVoluntarioCamp(vol: Usuario) {//manipula el arreglo de voluntarios 
    let indice = this.users.indexOf(vol);
    this.users.splice(indice, 1);
    this.userAsigToCamp.push(vol);
    let volunt: camByVoluntInsert;
    volunt = {
      id_camp: this.idCamp,
      id_voluntier: vol.Email
    };
    this.camps.insertVoluntierByCamp(volunt).subscribe((responce) => {
      if (!responce) {
        this.getUsuarios();
        this.getCampByID();
        swal("Error al  insertar un voluntario", "Error", "error");
      } else {
        this.getVoluntariosPorCamp();
      }
    });
  }

  getVoluntariosPorCamp = () => {//obtiene los voluntarios por campamento
    this.camps.getVoluntPorCamp(this.idCamp).subscribe((response) => {
      this.voluntByCamp = response;
      debugger
      this.voluntByCamp.forEach((vol) => {
        this.users.forEach((user) => {
          if (user.Email === vol.id_voluntier && this.idCamp === vol.id_camp) {
            this.userAsigToCamp.push(user);
            let indice = this.users.indexOf(user);
            this.users.splice(indice, 1);
          }
        });
      });

    });
  }


  eliminarVol(userAsig: Usuario) {//manipula el arreglo de voluntarios asignados 
    let indice = this.userAsigToCamp.indexOf(userAsig);
    this.userAsigToCamp.splice(indice, 1);
    this.users.push(userAsig);
  }

  guardarCambios() {//almacena la realción entre voluntarios y campamentos 
  }


  eliminarVoltToCamp(userAsig: Usuario) {//eliminar una relacion entre un voluntario y un campamento
    let idRelacionVolunByCamp: number;
    this.voluntByCamp.forEach((volt) => {
      if (volt.id_camp === this.idCamp && volt.id_voluntier === userAsig.Email) {
        idRelacionVolunByCamp = volt.id_camp_by_volt;
      }
    });

    this.camps.deleteVoluntPorCamp(idRelacionVolunByCamp).subscribe((res) => {
      if(res){
        let indice = this.userAsigToCamp.indexOf(userAsig);
        this.userAsigToCamp.splice(indice, 1);
        this.users.push(userAsig);
      }
    });

  }


  getForms(){//obtiene los formularios por coordinador 
    this.user = this.dataStorageService.getObjectValue('UserNow');
    this.forms$ = this.camps.getFormsByCoord(this.user);
  }

  asignarFormToCamp(){//asigna un formulario a un campamento
    if(this.formGroupAsigForm.valid){
      let campByForm:FormByCamp = {
        id_camp : this.idCamp,
        id_form: this.formGroupAsigForm.value.id_form_feedback
      };
  
      this.camps.insertFormByCamp(campByForm).subscribe((resp) => {
         if(resp){
          this.formGroupAsigForm.reset();
          swal("Formulario Asignado", "Exito", "success");
         }else{
          swal("No pudo hacer la Asignación", "Error", "error");
         }
      });
    }
  }

  iniciarRegisterForm = () => {//inicia el formulario para asignar un formulario a un campamento 
    this.formGroupAsigForm = this.formBuilder.group({
      id_form_feedback: ['', [Validators.required]]
    });
  }

}

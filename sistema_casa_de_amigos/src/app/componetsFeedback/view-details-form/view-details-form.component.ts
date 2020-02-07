import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FeedbackService } from '../../servicesFeedback/feedback.service';
import { questFeedback,questType } from '../../interfaces/feedbackInterfaces';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import swal from 'sweetalert'; 




@Component({
  selector: 'app-view-details-form',
  templateUrl: './view-details-form.component.html',
  styleUrls: ['./view-details-form.component.css'],
  providers: [FeedbackService]

})
export class ViewDetailsFormComponent implements OnInit {
  formId:number; 
  formName:string;
  controEditar:boolean;
  questions$ : Observable<questFeedback[]>; 
  typeQuest$ :  Observable<questType[]>;  
  editedQuest:questFeedback;
  private formGroupRegisterQuest: FormGroup;
  idQuest:number;
  constructor(private activatedRoute:ActivatedRoute,
              private quest: FeedbackService,
              private datePipe: DatePipe,
              private formBuilder:FormBuilder) { }

 

  ngOnInit() {
   this.formId = this.activatedRoute.snapshot.params['id'];
   this.getForm();
   this.getQuestbyForm();
   this.iniciarRegisterQuest();
  }

  mantenimientoQuest(){//metodo para crear una nueva pregunta
    if(this.controEditar){
      if(this.formGroupRegisterQuest.valid){//para agregar una nueva pregunta
        let data = new FormData(); 
        data.append('question_feedback',this.formGroupRegisterQuest.value.question_feedback);
        data.append('id_type_quest', this.formGroupRegisterQuest.value.id_type_quest);
        data.append('date_update',this.datePipe.transform(Date.now(), 'yyyy-MM-dd'));
        this.quest.insertQuest(data).subscribe(res => {//metodo del servio que hace el post a DB
              if(res){
              this.idQuest = res; 
              let questByForm = new FormData();
              questByForm.append('id_form',this.formId.toString());
              questByForm.append('id_question', this.idQuest.toString());
              this.quest.insertQuestByForm(questByForm).subscribe(resp => {
                if(resp){
                  swal("Pregunta Guardada", "Exito", "success");
                  this.getQuestbyForm();
                  this.formGroupRegisterQuest.reset();
                }else{
                  swal("Error al guardar", "Error", "error");
                  this.getQuestbyForm();
                }
              });
              }else{
                swal("Error al guardar", "Error", "error");
                this.getQuestbyForm();
              }
        });
      }else{
        swal("Infromación incompleta", "Error", "error");
      }
    }else{//Para editar una pregunta
      if(this.formGroupRegisterQuest.valid){//para agregar una nueva pregunta
        let data = new FormData();
        data.append('id_quest_feedback',this.editedQuest.id_quest_feedback.toString());
        data.append('question_feedback',this.formGroupRegisterQuest.value.question_feedback);
        data.append('id_type_quest', this.formGroupRegisterQuest.value.id_type_quest);
        data.append('date_update',this.datePipe.transform(Date.now(), 'yyyy-MM-dd'));
        this.quest.editQuest(data).subscribe(res => {//metodo del servio que hace el post a DB
              if(res){
                swal("Pregunta Actualizada", "Exito", "success");
                this.getQuestbyForm();
                this.formGroupRegisterQuest.reset();
              }else{
                swal("Error al guardar", "Error", "error");
                this.getQuestbyForm();
              }
        });
      }else{
        swal("Infromación incompleta", "Error", "error");
      }

    }
    
  }

  getForm(){//obtiene le formulario que se va a editar
   this.quest.getFormsById(this.formId).subscribe(data => {
   this.formName = data.form_name;
   });
   this.typeQuest$ = this.quest.getTypeQuest();
  }


  getQuestbyForm(){//obtiene las preguntas que pertenecen a este formulario 
    this.questions$ = this.quest.getQuesByForm(this.formId);
  }

  iniciarRegisterQuest = () => {//metodo para iniciar el fromulario de la nueva pregunta
    this.formGroupRegisterQuest = this.formBuilder.group({
      id_type_quest: ['', [Validators.required]],
      question_feedback: ['', [Validators.required]]
    });
  }


  editarQuest(quest:any){//fucnion que inserta los datos dentro del fiormulario de edicion de preguntas
    this.controEditar = false;
    this.editedQuest = quest;
    this.formGroupRegisterQuest.patchValue({
      id_type_quest: quest.id_type_quest,
      question_feedback: quest.question_feedback
    });
  }


  controEditarGuardar(control:boolean){//funcion que identifica de una nuva insercion de un editar
    if(control){
      this.controEditar = true;
    }else{
      this.controEditar = false;
    }
    
  }
}

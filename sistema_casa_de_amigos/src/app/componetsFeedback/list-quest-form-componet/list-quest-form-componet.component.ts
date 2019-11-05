import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';
import { DataStorageService } from 'src/app/services/data-storage.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { camByVoluntInsert } from '../../interfaces/feedbackInterfaces';
import { RespByQuest, formFeedBack, QuestByForm} from '../../interfaces/feedbackInterfaces';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';
import { UsuariosService } from '../../services/usuarios.service';
import { ActivatedRoute } from '@angular/router';
import { FeedbackFormServiceService } from '../../servicesFeedback/feedback-form-service.service';


@Component({
  selector: 'app-list-quest-form-componet',
  templateUrl: './list-quest-form-componet.component.html',
  styleUrls: ['./list-quest-form-componet.component.css'],
  providers: [FeedbackFormServiceService]
})
export class ListQuestFormComponetComponent implements OnInit {
  private idForm: number;  
  private quests: QuestByForm[] = [];
  private respByForm: RespByQuest[] = [];
  private quest : QuestByForm;
  private indice:number = 0;
  public optionsBinarios:any = [
    {id: 1, name:"SI (Yes)"},
    {id: 2, name:"NO (Not)"}
  ];

  public optionsEscala:any = [
    {id: 0, name:"0"},
    {id: 1, name:"1"},
    {id: 2, name:"2"},
    {id: 3, name:"3"},
    {id: 4, name:"4"},
    {id: 5, name:"5"},
    {id: 6, name:"6"},
    {id: 7, name:"7"},
    {id: 8, name:"8"},
    {id: 9, name:"9"},
    {id: 10, name:"10"},
  ];
  private value:any;
  private selectedBinario:string;
  private selectedScala:string;
  private respTexto:string;
  private idUserVolnt:string;

  constructor(private activatedRoute: ActivatedRoute,
              private datePipe: DatePipe,
              private dataStorageService:DataStorageService,
              private questService: FeedbackFormServiceService) { }

  ngOnInit(){
    this.idForm = this.activatedRoute.snapshot.params['id'];
    this.idUserVolnt = this.dataStorageService.getObjectValue('UserNow');
    this.getQuestion();
  }

  getQuestion(){
    this.questService.getQuestionByForm(this.idForm).subscribe((resp) =>{
       this.quests = resp;
       this.quest = this.quests[this.indice];
    });
  }

  next(typeQuest:QuestByForm){
    if(this.indice < this.quests.length - 1){
      this.indice += 1;
      this.quest = this.quests[this.indice];
      let resp:RespByQuest;

     if(typeQuest.type_cues === 'Binario'){
      resp = {
        responce: this.selectedBinario,
        date_update : this.datePipe.transform(Date.now(), 'yyyy-MM-dd'),
        id_question_by_form : typeQuest.id_form_by_quest,
        voluntier : this.idUserVolnt
      }

     }

     if(typeQuest.type_cues === 'Escala'){
      resp = {
        responce: this.selectedScala,
        date_update : this.datePipe.transform(Date.now(), 'yyyy-MM-dd'),
        id_question_by_form : typeQuest.id_form_by_quest,
        voluntier : this.idUserVolnt
      }
     }

     if(typeQuest.type_cues === 'Texto'){
      resp = {
        responce: this.respTexto,
        date_update : this.datePipe.transform(Date.now(), 'yyyy-MM-dd'),
        id_question_by_form : typeQuest.id_form_by_quest,
        voluntier : this.idUserVolnt
      }
     }
     this.respByForm.push(resp);
    }
  }

  back(){
    if(this.indice > 0){
      this.indice -= 1;
      this.quest = this.quests[this.indice];
    }
  }

}
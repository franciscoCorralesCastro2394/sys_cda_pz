import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FeedbackService } from '../../servicesFeedback/feedback.service';
import { questFeedback,questType } from '../../interfaces/feedbackInterfaces';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';



@Component({
  selector: 'app-view-details-form',
  templateUrl: './view-details-form.component.html',
  styleUrls: ['./view-details-form.component.css'],
  providers: [FeedbackService]

})
export class ViewDetailsFormComponent implements OnInit {
  formId:number; 
  formName:string;
  questions$ : Observable<questFeedback[]>; 
  typeQuest$ :  Observable<questType[]>;  
  private formGroupRegisterQuest: FormGroup;
  constructor(private activatedRoute:ActivatedRoute,
              private quest: FeedbackService,
              private formBuilder:FormBuilder) { }

 

  ngOnInit() {
   this.formId = this.activatedRoute.snapshot.params['id'];
   this.questions$
   this.getForm();
   this.getQuestbyForm();
   this.iniciarRegisterQuest();
  }

  getForm(){
   this.quest.getFormsById(this.formId).subscribe(data => {
   this.formName = data.form_name;
   });
   this.typeQuest$ = this.quest.getTypeQuest();
   console.log(this.typeQuest$)
  }


  getQuestbyForm(){
    this.questions$ = this.quest.getQuesByForm(this.formId);
  }

  iniciarRegisterQuest = () => {
    this.formGroupRegisterQuest = this.formBuilder.group({
      id_type_quest: ['', [Validators.required]],
      question_feedback: ['', [Validators.required]]
    });
  }

}

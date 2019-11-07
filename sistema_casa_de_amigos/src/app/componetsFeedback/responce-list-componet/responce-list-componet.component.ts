import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FeedbackFormServiceService } from '../../servicesFeedback/feedback-form-service.service';
import { ResponceByForm,questType } from '../../interfaces/feedbackInterfaces';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import swal from 'sweetalert'; 

@Component({
  selector: 'app-responce-list-componet',
  templateUrl: './responce-list-componet.component.html',
  styleUrls: ['./responce-list-componet.component.css'],
  providers: [FeedbackFormServiceService]
})
export class ResponceListComponetComponent implements OnInit {
  questions$ : Observable<ResponceByForm[]>; 
  idForm:number;

  constructor(private activatedRoute:ActivatedRoute,
              private quest: FeedbackFormServiceService,
              private datePipe: DatePipe,
              private formBuilder:FormBuilder) { }

  ngOnInit() {
    this.idForm = this.activatedRoute.snapshot.params['id'];
    this.questions$ = this.quest.getRespByFormByVolunt(this.idForm);
  }

}

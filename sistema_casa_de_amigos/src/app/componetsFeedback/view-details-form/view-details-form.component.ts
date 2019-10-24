import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FeedbackService } from '../../servicesFeedback/feedback.service';
import { formFeedBack } from '../../interfaces/feedbackInterfaces';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-view-details-form',
  templateUrl: './view-details-form.component.html',
  styleUrls: ['./view-details-form.component.css'],
  providers: [FeedbackService]

})
export class ViewDetailsFormComponent implements OnInit {
  formId:number; 
  formName:string;
  constructor(private activatedRoute:ActivatedRoute,
              private forms: FeedbackService) { }

 

  ngOnInit() {
   this.formId = this.activatedRoute.snapshot.params['id'];
   this.getForm();
  }

  getForm(){
   this.forms.getFormsById(this.formId).subscribe(data => {
   this.formName = data.form_name;
   });
  }

}

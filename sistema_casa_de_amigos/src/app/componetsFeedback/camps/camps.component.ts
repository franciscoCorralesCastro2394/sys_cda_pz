import { Component, OnInit } from '@angular/core'; 
import { FeedbackService } from '../../servicesFeedback/feedback.service';
import { formFeedBack,campFeedback } from '../../interfaces/feedbackInterfaces';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';
import swal from 'sweetalert'; 
import { DataStorageService } from 'src/app/services/data-storage.service';


@Component({
  selector: 'app-camps',
  templateUrl: './camps.component.html',
  styleUrls: ['./camps.component.css'],
  providers: [FeedbackService]
})
export class CampsComponent implements OnInit {

   private idInserted = 0; 
  constructor(private camps: FeedbackService,private datePipe: DatePipe,
              private dataStorageService:DataStorageService ) { }
   camps$ : Observable<campFeedback[]>; 
   private user:string;

  ngOnInit() {
    this.getForms();
  }


  getForms(){
    this.user = this.dataStorageService.getObjectValue('UserNow');
    this.camps$ = this.camps.getCampsByCoord(this.user);
  }


}

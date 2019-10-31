import { Component, OnInit } from '@angular/core'; 
import { FeedbackService } from '../../servicesFeedback/feedback.service';
import { formFeedBack,campFeedback } from '../../interfaces/feedbackInterfaces';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';
import swal from 'sweetalert'; 
import { DataStorageService } from 'src/app/services/data-storage.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Router} from '@angular/router';


@Component({
  selector: 'app-camps',
  templateUrl: './camps.component.html',
  styleUrls: ['./camps.component.css'],
  providers: [FeedbackService]
})
export class CampsComponent implements OnInit {

  private idInserted = 0; 
  constructor(private camps: FeedbackService,
              private datePipe: DatePipe,
              private dataStorageService:DataStorageService,
              private formBuilder:FormBuilder,
              private router:Router) { }
   camps$ : Observable<campFeedback[]>; 
   private user:string;
   private formGroupRegisterCamp: FormGroup;

  ngOnInit() {
    this.getCamps();
    this.iniciarRegisterCamp();
  }


  getCamps(){
    this.user = this.dataStorageService.getObjectValue('UserNow');
    this.camps$ = this.camps.getCampsByCoord(this.user);
  }


  iniciarRegisterCamp = () => {
    this.formGroupRegisterCamp = this.formBuilder.group({
      camp_mane: ['', [Validators.required]],
      date_ini: ['', [Validators.required]],
      date_end: ['', [Validators.required]]
    });
  }


  nuevoCamp(){
    if(this.formGroupRegisterCamp.valid){
       let Newcamp:campFeedback = { 
         camp_mane: this.formGroupRegisterCamp.value.camp_mane,
         date_end : this.formGroupRegisterCamp.value.date_end,
         date_ini : this.formGroupRegisterCamp.value.date_ini,
         id_coordinator :   this.user,
         update_date : this.datePipe.transform(Date.now(), 'yyyy-MM-dd')
       }
       this.camps.insertCamp(Newcamp).subscribe(res => {
          console.log(res);
          if(res){
            this.getCamps();
            this.formGroupRegisterCamp.reset();
            swal("Campamento Registrado", "Exito", "success");
          }else{
            this.getCamps();
            swal("Error", "Formulario con errores", "error");
            }});
     
            }else{
            this.getCamps();
            swal("Error", "Formulario con errores", "error");
            }
     }


  verDetalle(data:campFeedback){
      this.router.navigate(['view-details-camp',data.id_camp_group]);
    }

}

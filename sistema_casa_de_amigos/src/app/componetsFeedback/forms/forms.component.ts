import { Component, OnInit } from '@angular/core'; 
import { FeedbackService } from '../../servicesFeedback/feedback.service';
import { formFeedBack } from '../../interfaces/feedbackInterfaces';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';
import swal from 'sweetalert'; 

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css'],
  providers: [FeedbackService]
})
export class FormsComponent implements OnInit {

  constructor(private forms: FeedbackService,private datePipe: DatePipe) { }
   forms$ : Observable<formFeedBack[]>; 
  
  ngOnInit() {
   this.getForms();
  }

  getForms(){
    this.forms$ = this.forms.getForms();
  }

  nuevoForm(newForm:string){
    console.log(newForm);
    let fecha = Date.now();

    let data = new FormData();
    data.append('form_name',newForm);
    data.append('form_update',this.datePipe.transform(fecha, 'yyyy-MM-dd'));
    
    this.forms.insertForms(data).subscribe(data =>{
       if(data.toString() === 'ok'){
        swal("Formulario Guardado", "Exito", "success");
        this.getForms();
       }else{
        swal("Error al almacenar", "Error", "error");
        this.getForms();
       }
    });


  }

}

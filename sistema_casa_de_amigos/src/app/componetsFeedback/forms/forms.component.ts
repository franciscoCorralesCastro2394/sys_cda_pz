import { Component, OnInit } from '@angular/core'; 
import { FeedbackService } from '../../servicesFeedback/feedback.service';
import { formFeedBack } from '../../interfaces/feedbackInterfaces';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';
import swal from 'sweetalert'; 
import { DataStorageService } from 'src/app/services/data-storage.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css'],
  providers: [FeedbackService]
})
export class FormsComponent implements OnInit {

  private idInserted = 0; 
  constructor(private forms: FeedbackService,private datePipe: DatePipe,
              private dataStorageService:DataStorageService,
              private formBuilder:FormBuilder  ) { }
   forms$ : Observable<formFeedBack[]>; 
   private user:string;
   private formGroupRegisterForm: FormGroup;
   private editedForm:formFeedBack;
  
  ngOnInit() {
   this.getForms();
   this.iniciarRegisterForm();
  }

  getForms(){
    this.user = this.dataStorageService.getObjectValue('UserNow');
    this.forms$ = this.forms.getFormsByCoord(this.user);
  }

  //funcion que inserta un formulario, ademas de crear la relacion formulario por Coordinador 
  nuevoForm(newForm:string){
    console.log(newForm);
    let fecha = Date.now();

    let data = new FormData();//objeto que va a ser un formulario
    data.append('form_name',newForm);
    data.append('form_update',this.datePipe.transform(fecha, 'yyyy-MM-dd'));
    
    this.forms.insertForms(data).subscribe(data =>{//el objeto se envia la base de datos
       if(data){
         this.idInserted = +data; // se obtiene el id del objeto insertado
         let fomrByCoor = new FormData();
         fomrByCoor.append('coordinador',this.user);
         fomrByCoor.append('id_form',this.idInserted.toString());
         fomrByCoor.append('date_update',this.datePipe.transform(fecha, 'yyyy-MM-dd'));
         this.forms.insertFormsByCoordinador(fomrByCoor).subscribe(responce => {//inseratr la relacion formulario por Coordinador
            if(responce){
              console.log(responce)
              this.getForms();
              swal("Formulario Guardado", "Exito", "success");
            }    
         });
       }else{
        swal("Error al almacenar", "Error", "error");
        this.getForms();
       }
    });


  }

  EditForm(){
    let data = new FormData();
    data.append('form_name',this.formGroupRegisterForm.value.form_name);
    data.append('form_update',this.datePipe.transform(Date.now(), 'yyyy-MM-dd'));
    data.append('id_form_feedback',this.editedForm.id_form_feedback.toString()); 

    this.forms.editForm(data).subscribe(responce => {//inseratr la relacion formulario por Coordinador
      if(responce){
        console.log(responce)
        this.getForms();
        swal("Formulario Guardado", "Exito", "success");
      }else{
        swal("Error al almacenar", "Error", "error");
        this.getForms();
       }    
   });

  }

  editarForm(form:formFeedBack){//pasa el valor al formuario del modal para poder editar
    debugger
    this.editedForm = form;
    this.formGroupRegisterForm.patchValue({
      form_name: form.form_name
    });
  }

  iniciarRegisterForm = () => {//inicia el formulario para editar 
    this.formGroupRegisterForm = this.formBuilder.group({
      form_name: ['', [Validators.required]]
    });
  }

}

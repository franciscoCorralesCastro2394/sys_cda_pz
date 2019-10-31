import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { formFeedBack,coordByForm,campFeedback,questFeedback,questType,camByVoluntInsert} from '../interfaces/feedbackInterfaces';
import { Observable } from 'rxjs';

@Injectable(
  //{providedIn: 'root'}
)
export class FeedbackService {

  urlApiFormsFeedback = 'http://localhost:80/be_sys_ca_module_feedback/index.php/api/';
  constructor(private http: HttpClient) { 
  }

  getForms(): Observable<formFeedBack[]>{
    return this.http.get<formFeedBack[]>(this.urlApiFormsFeedback + 'Formularios/getFormularios/');
  }

  insertForms(data:any): Observable<formFeedBack>{
    return this.http.post<formFeedBack>(this.urlApiFormsFeedback + 'Formularios/insertFormularios',data);
  }

  insertFormsByCoordinador(data:any): Observable<coordByForm>{//inserta formularios por coordinador 
    return this.http.post<coordByForm>(this.urlApiFormsFeedback + 'CoordinadorPorForm/insertCoordinadorPorForm',data);
  }

  getFormsByCoord(user:string): Observable<formFeedBack[]>{//obtiene formularios por coordinador 
    let uri = "Formularios/getFormulariosPorCoord/" + user;
    return this.http.get<formFeedBack[]>(this.urlApiFormsFeedback + uri);
  }
  


  getCampsByCoord(user:string): Observable<campFeedback[]>{//metodo para obtener campamentos por coordinador 
    let uri = "Campamentos/getCampamentosPorCoord/" + user;
    return this.http.get<campFeedback[]>(this.urlApiFormsFeedback + uri);
  }
  


  insertCamp(data:campFeedback): Observable<campFeedback>{//metodo para insertar un formulario
    return this.http.post<campFeedback>(this.urlApiFormsFeedback + 'Campamentos/insertCampamentos',data);
  }


  editForm(data:any): Observable<formFeedBack>{//metodo para editar un formulario
    return this.http.post<formFeedBack>(this.urlApiFormsFeedback + 'Formularios/updateFormularios',data);
  }



  getFormsById(id:number): Observable<formFeedBack>{//metodo para obtener formularios 
    return this.http.get<formFeedBack>(this.urlApiFormsFeedback + 'Formularios/getFormularios/'+id);
  }


  getQuesByForm(id:number): Observable<questFeedback[]>{//metodo pra obtener las preguntas por formulario 
    return this.http.get<questFeedback[]>(this.urlApiFormsFeedback + 'Preguntas/getPreguntasPorForm/'+id);
  }


  getTypeQuest(): Observable<questType[]>{//metodo pra obtener los tipos de preguntas
    return this.http.get<questType[]>(this.urlApiFormsFeedback + 'TipoPregunta/getTipoPregunta');
  }


  insertQuest(data:any): Observable<any>{//metodo para insertar un Preguntas
    return this.http.post<any>(this.urlApiFormsFeedback + 'Preguntas/insertPreguntas/',data);
  }


  insertQuestByForm(data:any): Observable<any>{//metodo para insertar un Preguntas por formulario 
    return this.http.post<any>(this.urlApiFormsFeedback + 'FormPorPregunta/insertFormPorPregunta',data);
  }

  editQuest(data:any){
    return this.http.post<any>(this.urlApiFormsFeedback + 'Preguntas/updatePreguntas',data);
  }


  getCampById(id:number): Observable<campFeedback>{//metodo para obtener el camp por id 
    return this.http.get<campFeedback>(this.urlApiFormsFeedback + 'Campamentos/getCampamentos/'+id);
  }


  insertVoluntierByCamp(data:camByVoluntInsert): Observable<camByVoluntInsert>{//metodo para insertar un Preguntas por formulario 
    return this.http.post<camByVoluntInsert>(this.urlApiFormsFeedback + 'CampamentoPorVoluntario/insertCampamentoPorVoluntario',data);
  }


  getVoluntPorCamp(idCamp:number): Observable<camByVoluntInsert[]>{//metodo pra obtener los tipos de preguntas
    return this.http.get<camByVoluntInsert[]>(this.urlApiFormsFeedback + 'CampamentoPorVoluntario/getVoluntPorCamp/'+idCamp);
  }
}

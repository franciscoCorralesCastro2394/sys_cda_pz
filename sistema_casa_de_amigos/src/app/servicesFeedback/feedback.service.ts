import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { formFeedBack,coordByForm,campFeedback } from '../interfaces/feedbackInterfaces';
import { Observable } from 'rxjs';

@Injectable(
  //{providedIn: 'root'}
)
export class FeedbackService {

  urlApiFormsFeedback = 'http://localhost:8080/be_sys_ca_module_feedback/index.php/api/';
  constructor(private http: HttpClient) { 
  }

  getForms(): Observable<formFeedBack[]>{
    return this.http.get<formFeedBack[]>(this.urlApiFormsFeedback + 'Formularios/getFormularios/');
  }

  insertForms(data:any): Observable<formFeedBack>{
    return this.http.post<formFeedBack>(this.urlApiFormsFeedback + 'Formularios/insertFormularios',data);
  }

  insertFormsByCoordinador(data:any): Observable<coordByForm>{
    return this.http.post<coordByForm>(this.urlApiFormsFeedback + 'CoordinadorPorForm/insertCoordinadorPorForm',data);
  }

  getFormsByCoord(user:string): Observable<formFeedBack[]>{
    let uri = "Formularios/getFormulariosPorCoord/" + user;
    return this.http.get<formFeedBack[]>(this.urlApiFormsFeedback + uri);
  }
  


  getCampsByCoord(user:string): Observable<campFeedback[]>{
    let uri = "Campamentos/getCampamentosPorCoord/" + user;
    return this.http.get<campFeedback[]>(this.urlApiFormsFeedback + uri);
  }
  


  insertCamp(data:campFeedback): Observable<campFeedback>{
    return this.http.post<campFeedback>(this.urlApiFormsFeedback + 'Campamentos/insertCampamentos',data);
  }


  editForm(data:any): Observable<formFeedBack>{
    return this.http.post<formFeedBack>(this.urlApiFormsFeedback + 'Formularios/updateFormularios',data);
  }



  getFormsById(id:number): Observable<formFeedBack>{
    return this.http.get<formFeedBack>(this.urlApiFormsFeedback + 'Formularios/getFormularios/'+id);
  }


}

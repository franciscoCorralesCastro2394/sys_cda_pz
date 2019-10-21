import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { formFeedBack } from '../interfaces/feedbackInterfaces';
import { Observable } from 'rxjs';

@Injectable(
  //{providedIn: 'root'}
)
export class FeedbackService {

  urlApiFormsFeedback = 'http://localhost:8080/be_sys_ca_module_feedback/index.php/api/Formularios/';
  constructor(private http: HttpClient) { 
  }

  getForms(): Observable<formFeedBack[]>{
    return this.http.get<formFeedBack[]>(this.urlApiFormsFeedback + 'getFormularios');
  }

  insertForms(data:any): Observable<formFeedBack[]>{
    return this.http.post<formFeedBack[]>(this.urlApiFormsFeedback + 'insertFormularios',data);
  }




}

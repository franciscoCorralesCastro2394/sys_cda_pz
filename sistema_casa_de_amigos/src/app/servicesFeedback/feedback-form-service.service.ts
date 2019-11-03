import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormByCampByVolt } from '../interfaces/feedbackInterfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackFormServiceService {

  
  urlApiFormsFeedback = 'http://localhost:80/be_sys_ca_module_feedback/index.php/api/';
  constructor(private http: HttpClient) { 
  }


  getFormsById(iduser:string): Observable<FormByCampByVolt[]>{//metodo para obtener formularios de un voluntario enun campamento
    return this.http.get<FormByCampByVolt[]>(this.urlApiFormsFeedback + 'Formularios/getFormulariosPorCampPorVolt/'+iduser);
  }

}

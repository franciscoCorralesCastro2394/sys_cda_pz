import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormByCampByVolt,QuestByForm,RespByQuest,FormByCampByVolunt,ResponceByForm} from '../interfaces/feedbackInterfaces';
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

  getQuestionByForm(formID:number): Observable<QuestByForm[]>{//metodo para obtener formularios de un voluntario enun campamento
    return this.http.get<QuestByForm[]>(this.urlApiFormsFeedback + 'Preguntas/getPreguntasPorFormulario/'+formID);
  }


  insertRespByQuest(data:RespByQuest): Observable<RespByQuest>{//metodo para obtener formularios de un voluntario enun campamento
    return this.http.post<RespByQuest>(this.urlApiFormsFeedback + 'RespuestaPorPregunta/insertRespuestaPorPregunta/',data);
  }


  getFormByCampByVolunt(): Observable<FormByCampByVolunt[]>{//metodo para obtener formularios de un voluntario enun campamento
    return this.http.get<FormByCampByVolunt[]>(this.urlApiFormsFeedback + 'FormularioPorVoluntario/getFormularioPorVoluntario/');
  }

  insertFormByCampByVolunt(data:FormByCampByVolunt): Observable<FormByCampByVolunt>{//metodo para obtener formularios de un voluntario enun campamento
    return this.http.post<FormByCampByVolunt>(this.urlApiFormsFeedback + 'FormularioPorVoluntario/insertFormularioPorVoluntario/',data);
  }


  getRespByFormByVolunt(idForm:number): Observable<ResponceByForm[]>{//metodo para obtener formularios de un voluntario enun campamento
    return this.http.get<ResponceByForm[]>(this.urlApiFormsFeedback + 'RespuestaPorPregunta/getPreguntasPorForm/'+idForm);
  }
}

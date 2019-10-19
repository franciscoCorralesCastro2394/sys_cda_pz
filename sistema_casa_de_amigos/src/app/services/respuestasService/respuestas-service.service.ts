import { Injectable } from '@angular/core';
import { Respuesta } from '../../interfaces/respuesta.interface';
import 'rxjs/Rx';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RespuestasServiceService {

  private respColletionName = 'respuestas';
  constructor(private angularFirestore:AngularFirestore){ } 
  

  getAllRespuestas(): Observable<Respuesta[]> {
    return this.angularFirestore.collection<Respuesta>(this.respColletionName).valueChanges();
  }

   saveRespuetas(resp: Respuesta){
     if(resp.id && resp.id != ''){
        this.angularFirestore.collection<Respuesta>(this.respColletionName).doc(resp.idResena).set(resp);
     }else{
      resp.id = this.angularFirestore.createId(); 
      this.angularFirestore.collection<Respuesta>(this.respColletionName).doc(resp.idResena).set(resp);      
     }
    
  }


}

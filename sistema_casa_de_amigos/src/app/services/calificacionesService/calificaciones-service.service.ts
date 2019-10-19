import { Injectable } from '@angular/core';
import { calificacion } from '../../interfaces/calificacion.interfaces';
import 'rxjs/Rx';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalificacionesServiceService {
   private calificacionesCollectionName = 'calificaciones';
  constructor(private angularFirestore: AngularFirestore ) { }


  getAllCalificaciones(): Observable<calificacion[]> {
    return this.angularFirestore.collection<calificacion>(this.calificacionesCollectionName).valueChanges();
  }


   saveCalificaciones(cali: calificacion){
    if(cali.id && cali.id != ''){
       this.angularFirestore.collection<calificacion>(this.calificacionesCollectionName).doc(cali.id).set(cali);
    }else{
      cali.id = this.angularFirestore.createId();
      this.angularFirestore.collection<calificacion>(this.calificacionesCollectionName).doc(cali.id).set(cali);      
    }
  }

}

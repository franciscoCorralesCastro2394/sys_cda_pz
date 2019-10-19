import { Injectable } from '@angular/core';
import { sitioSeguido } from '../../interfaces/sitiosSeguidos.interfaces';
import 'rxjs/Rx';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SitioSeguidoServiceService {

  private sitioColletionName = 'sitiosSeguidos';
  constructor(private angularFirestore: AngularFirestore ) { }


  getAllSitiosSeguidos(): Observable<sitioSeguido[]> {
    return this.angularFirestore.collection<sitioSeguido>(this.sitioColletionName).valueChanges();
  }


   saveSitiosSeguisdos(sSeguido: sitioSeguido){
     if(sSeguido.id && sSeguido.id != ''){
        this.angularFirestore.collection<sitioSeguido>(this.sitioColletionName).doc(sSeguido.id).set(sSeguido); 
     }else{
      sSeguido.id = this.angularFirestore.createId(); 
      this.angularFirestore.collection<sitioSeguido>(this.sitioColletionName).doc(sSeguido.id).set(sSeguido); 
     }
  }
}

import { Injectable } from '@angular/core';
import { comentario } from '../../interfaces/comentario.interface';
import 'rxjs/Rx';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {

  private calificacionesCollectionName = 'comentarios';
  constructor(private angularFirestore: AngularFirestore ) { }

  getAllComentarios(): Observable<comentario[]> {
    return this.angularFirestore.collection<comentario>(this.calificacionesCollectionName).valueChanges();
  }


   saveComentario(com: comentario){
     if(com.id && com.id != ''){
         this.angularFirestore.collection<comentario>(this.calificacionesCollectionName).doc(com.id).update(com);
     }else{
        com.id = this.angularFirestore.createId(); 
      this.angularFirestore.collection<comentario>(this.calificacionesCollectionName).doc(com.id).set(com);      
     }
    
  }


}


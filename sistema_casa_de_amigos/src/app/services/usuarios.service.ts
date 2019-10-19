import { Injectable } from '@angular/core';
import { Usuario  } from '../interfaces/heroes.interfaces';
import 'rxjs/Rx';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
 

   private UsuarioCollectionName = 'usuarios';
  constructor(private angularFirestore: AngularFirestore ) {

   }

   getAllUaurios(): Observable<Usuario[]> {
    return this.angularFirestore.collection<Usuario>(this.UsuarioCollectionName).valueChanges();
  }


   saveUsuario(user: Usuario){
    if(user.id && user.id != ''){
        this.angularFirestore.collection<Usuario>(this.UsuarioCollectionName).doc(user.id).set(user);   
    }else{
      user.id = this.angularFirestore.createId();
      this.angularFirestore.collection<Usuario>(this.UsuarioCollectionName).doc(user.id).set(user);         
    }

  }

  getAllEditores(): Observable<Usuario[]> {
    return this.angularFirestore.collection<Usuario>(this.UsuarioCollectionName, ref => ref.where('Editor','==',true)).valueChanges();
  }




  getUsuarioByEmail(email: string): Observable<Usuario[]> {
    return  this.angularFirestore.collection<Usuario>(this.UsuarioCollectionName, ref => ref.where('Email', '==', email)).valueChanges();
  }

  deleteUsuario(user:Usuario){
  this.angularFirestore.collection<Usuario>(this.UsuarioCollectionName).doc(user.id).delete();
  }

}

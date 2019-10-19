import { Injectable } from '@angular/core';
import { Noticia } from '../../interfaces/noticia.interface';
import 'rxjs/Rx';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NoticiaServiceService {
  private NoticiaCollectionName = 'noticias';
  constructor(private angularFirestore: AngularFirestore ) { }

  getAllNoticias(): Observable<Noticia[]> {
    return this.angularFirestore.collection<Noticia>(this.NoticiaCollectionName).valueChanges();
  }


   saveNoticia(noticia: Noticia):string{
     if( noticia.Id && noticia.Id != '' ){
       this.angularFirestore.collection<Noticia>(this.NoticiaCollectionName).doc(noticia.Id).set(noticia);
     }else{
      noticia.Id = this.angularFirestore.createId(); 
      this.angularFirestore.collection<Noticia>(this.NoticiaCollectionName).doc(noticia.Id).set(noticia);      
     }
    return noticia.Id;
  }

  getNoticiasByID(idNoticia:string ): Observable<Noticia[]> {
    return  this.angularFirestore.collection<Noticia>(this.NoticiaCollectionName, ref => ref.where('Email', '==',idNoticia)).valueChanges();

  }


}

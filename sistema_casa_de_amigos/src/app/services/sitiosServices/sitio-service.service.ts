import { Injectable } from '@angular/core';
import { Sitio } from '../../interfaces/sitio.interface';
import { sitioSeguido } from '../../interfaces/sitiosSeguidos.interfaces';
import 'rxjs/Rx';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SitioServiceService {

  private sitiosCollectionName = 'sitios';
  constructor(private angularFirestore: AngularFirestore ) { }

  getAllSitios(): Observable<Sitio[]> {
    return this.angularFirestore.collection<Sitio>(this.sitiosCollectionName).valueChanges();
  }

   savSitios(sitio: Sitio):string{
    if(sitio.id && sitio.id != ''){
      this.angularFirestore.collection<Sitio>(this.sitiosCollectionName).doc(sitio.id).set(sitio);      
    }else {
      sitio.id = this.angularFirestore.createId(); 
      this.angularFirestore.collection<Sitio>(this.sitiosCollectionName).doc(sitio.id).set(sitio);      
    }
    return sitio.id;
  }

  
  searchSitio(term:string){
    return  this.angularFirestore.collection<Sitio>(this.sitiosCollectionName, ref => ref.where('nombre','==',term)).valueChanges();
  }

  saveSitiosSeguisdos(sSeguido: sitioSeguido){
    this.angularFirestore.collection<sitioSeguido>('sitiosSeguidos').add(sSeguido);
  }

  getSitiosById(term: string): Observable<Sitio[]> { 
    return  this.angularFirestore.collection<Sitio>(this.sitiosCollectionName, ref => ref.where('id', '==', term)).valueChanges();
}

deleteSitio(sitio: Sitio) { 
  this.angularFirestore.collection<Sitio>(this.sitiosCollectionName).doc(sitio.id).delete();
}

}

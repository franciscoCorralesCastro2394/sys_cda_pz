import { Injectable } from '@angular/core';
import { Upload } from 'src/app/clases/upload.class';
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import swal from 'sweetalert';
import { Sitio } from '../../interfaces/sitio.interface';

@Injectable({
  providedIn: 'root'
})
export class UpLoadServiceService {
  private basePath: string = '/uploads';
  constructor(private angularFirestore: AngularFirestore) { }



  pushUpload(upload: Upload, elementoNombre: string, noticiasUpLoad?:string) {
    let storageRef = firebase.storage().ref();
    let uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
      swal("Se ha presentado un error:", "Atención", "error");
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {

          upload.url = downloadURL;
          upload.name = upload.file.name;
          if(!noticiasUpLoad){
            this.saveFileData(upload, elementoNombre);
          }else{
            this.saveFileDataNoticias(upload,elementoNombre)
          }
        });

      }
    );
  }

  private saveFileData(upload: Upload, elementoNombre: string) {
    this.angularFirestore.collection<Sitio>('sitios').ref.where('nombre', '==', elementoNombre).get()
     .then(  (querySnapshot) => {
       
      querySnapshot.docs.forEach(doc => {
        var elementRef = this.angularFirestore.collection('sitios').doc(doc.id);
      
        let nuevoArregloDeImagenes= doc.get('imgs');
        nuevoArregloDeImagenes.push(upload.url);
        return elementRef.update({ 
          imgs: nuevoArregloDeImagenes
        }).then(()=>{
           swal("Se ha actualizado la información del elemento:", "Información", "info");
        }).catch((error)=>{
           swal("Se ha presentado un inconveniente al guardar:", "Atención", "error");  
        });
      });
    });
  }   

  deleteUpload(upload: Upload) {
    this.deleteFileFirestore(upload.$key)
      .then(() => {
        this.deleteFileStorage(upload.name)
      })
      .catch(error => console.log(error))
  }

  private deleteFileFirestore(id: string) {
    return this.angularFirestore.collection<Upload>('documents').doc(id).delete();
  }

  private deleteFileStorage(name: string) {
    let storageRef = firebase.storage().ref();
    storageRef.child(`${this.basePath}/${name}`).delete()
  }


  private saveFileDataNoticias(upload: Upload, elementoNombre: string) {

    this.angularFirestore.collection<Sitio>('noticias').ref.where('Id', '==', elementoNombre).get()
     .then(  (querySnapshot) => {
       
      querySnapshot.docs.forEach(doc => {
        var elementRef = this.angularFirestore.collection('noticias').doc(doc.id);
        return elementRef.update({ 
          Imagen: upload.url
        }).then(()=>{
           swal("Se ha actualizado la información del elemento:", "Información", "info");
        }).catch((error)=>{
           swal("Se ha presentado un inconveniente al guardar:", "Atención", "error");  
        });
      });
    });
  }   


}

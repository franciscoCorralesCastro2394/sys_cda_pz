import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert';
import { Sitio } from '../../interfaces/sitio.interface';
import { Observable, Subscription, from } from 'rxjs';
import { SitioServiceService } from '../../services/sitiosServices/sitio-service.service';
import { UsuariosService } from '../../services/usuarios.service';
import { Usuario } from 'src/app/interfaces/heroes.interfaces';
import * as _ from "lodash";
import { Upload } from 'src/app/clases/upload.class';
import { UpLoadServiceService } from 'src/app/services/upLoad/up-load-service.service'
import { Router } from '@angular/router';


@Component({
  selector: 'app-edit-sitio',
  templateUrl: './edit-sitio.component.html',
  styleUrls: ['./edit-sitio.component.css']
})

export class EditSitioComponent implements OnInit {
  sitioId:string;
  formGroupSitioEdit:FormGroup;
  formGroupSitioEditImagenes:FormGroup;
  IdSitio:number;
  sitios:Sitio[] = [];;
  sitios$:Observable<any>;
  idSit:number = 0; 
  users:any[] = [];
  editores$:Observable<any>;
  prueba:Subscription;
  currentUpload: Upload;
  selectedFiles: FileList;
  createdSitioId: string;
  editedSitioId: string;
  sitioSuscription: Subscription;
  
  constructor(private activatedRoute:ActivatedRoute, 
              private router:Router,          
              private formBuilder:FormBuilder, 
              private sitioServiceService:SitioServiceService,
              private usuariosService:UsuariosService,
              private upLoadServiceService:UpLoadServiceService
              
      ) {
    this.sitioId = this.activatedRoute.snapshot.params['id'];
    this.iniciarSitio();
    this.obtenerSitiosUsuarios();
    this.iniciarImagenes();
    if(!this.sitioId){
      this.iniciarSitio();
    }else{
      this.cargarSitio(this.sitioId);
    }
   }
   
  
   ngOnInit() {
 
  
  }

 obtenerSitiosUsuarios(){ 
    this.editores$ =  this.usuariosService.getAllEditores();
    this.editores$.subscribe((usersData:Usuario[]) =>{
      usersData.forEach(user => {
         if(user.roles.includes('Editor')){
           this.users.push(user);
         }
      }) ;
    });
  }


  iniciarSitio = () => {
    this.formGroupSitioEdit = this.formBuilder.group({
      id: ['', [],],
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required, Validators.minLength(15)]],
      horario: ['',Validators.required],
      videoYB: ['',Validators.required],
      Editor: ['',Validators.required],
      imagenes: this.formBuilder.array([Validators.required]),
    });
  }

  iniciarImagenes = () => {
    this.formGroupSitioEditImagenes = this.formBuilder.group({
      imagenes: this.formBuilder.array([Validators.required])
    });
  }

  cargarSitio = (id: string) => {
    this.sitioServiceService.getAllSitios().subscribe(data => {
      this.sitios = data ;
      this.sitios.forEach(sitio => {
        if (sitio.id == id) {
          this.editedSitioId = sitio.nombre;
            this.formGroupSitioEdit.patchValue({
            id: sitio.id,
            nombre: sitio.nombre,  
            img: sitio.img,
            descripcion: sitio.descripcion,
            horario: sitio.horario,
            videoYB: sitio.videoYB,
            Editor: sitio.Editor,
          });
          (<FormArray>this.formGroupSitioEdit.controls['imagenes']).removeAt(0);
             sitio.imgs.forEach((imagen: string) => {
              this.agregarImagen(imagen);
        });
        }
      });

    });

  } 

  guardarData = () => {
    
    if (this.formGroupSitioEdit.valid) {
      let sitio:Sitio = {
        descripcion: this.formGroupSitioEdit.value.descripcion,
        horario:  this.formGroupSitioEdit.value.horario,
        id: this.formGroupSitioEdit.value.id,
        nombre: this.formGroupSitioEdit.value.nombre,
        videoYB: this.formGroupSitioEdit.value.videoYB, 
        Editor:  this.formGroupSitioEdit.value.Editor,
        imgs : this.formGroupSitioEdit.value.imagenes
      }
      
      if(!this.editedSitioId){
        let imgs:string[] = []; 
        sitio.imgs = imgs;
        this.createdSitioId = this.sitioServiceService.savSitios(sitio);   
        this.createdSitioId = this.formGroupSitioEdit.value.nombre;
        
      }else{
        debugger
        this.sitioServiceService.savSitios(sitio);
        swal("Exito", "Debe ingresar la imagenes del Sitio", "info");
         this.router.navigate(['lista-sitios']); 
      }
      swal("Exito", "Debe ingresar la imagenes del Sitio", "info");
    } else {
      swal("Debe completar la información correctamente", "Intente de nuevo", "error");
    }
  }


  borrarImagen = ($event, index) => { 
    (<FormArray>this.formGroupSitioEdit.controls['imagenes']).removeAt(index); 
}

   agregarImagen = (imagen?: string, ) => {
  (<FormArray>this.formGroupSitioEdit.controls['imagenes']).push(
    new FormControl(imagen, Validators.required)
  );
}

detectFiles(event: any) {
  this.selectedFiles = event.target.files;
}

listo(){
  this.router.navigate(['lista-sitios']); 
}


uploadSingle() {
  let file = this.selectedFiles.item(0);
  this.currentUpload = new Upload(file);
  if(!this.editedSitioId){
   this.upLoadServiceService.pushUpload(this.currentUpload, this.createdSitioId);    
  }else{
   
    this.upLoadServiceService.pushUpload(this.currentUpload, this.editedSitioId);    
  }
}

}

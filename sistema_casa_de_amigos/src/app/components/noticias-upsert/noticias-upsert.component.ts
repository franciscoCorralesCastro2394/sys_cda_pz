import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { FormGroup, FormBuilder, Validators ,FormArray, FormControl } from '@angular/forms';
import { DataStorageService} from '../../services/data-storage.service';
import { Noticia} from '../../interfaces/noticia.interface';
import swal from 'sweetalert';
import { NoticiaServiceService } from '../../services/noticiasServices/noticia-service.service';
import { Router } from '@angular/router';
import { Upload } from 'src/app/clases/upload.class';
import { UpLoadServiceService } from 'src/app/services/upLoad/up-load-service.service'



@Component({
  selector: 'app-noticias-upsert',
  templateUrl: './noticias-upsert.component.html',
  styleUrls: ['./noticias-upsert.component.css']
})
export class NoticiasUpsertComponent implements OnInit {
  noticiaId:string = '';
  formGroup: FormGroup;
  IdNot: number = 0; 
  NoticiaCreatedId: string;
  formGroupNoticiasEditImagenes:FormGroup;
  currentUpload: Upload;
  selectedFiles: FileList;
  noticias:Noticia[] = [];

  constructor(private activatedRoute:ActivatedRoute, 
              private formBuilder:FormBuilder, 
              private dataStorageService:DataStorageService,
              private NoticiaService:NoticiaServiceService,
              private router:Router,
              private upLoadServiceService:UpLoadServiceService
              ) { 

    this.noticiaId = this.activatedRoute.snapshot.params['id'];
  

  }

  ngOnInit() {

    this.iniciarImagenes();
    this.iniciarNoticia();
   if(this.noticiaId){
     this.cargarNoticia(this.noticiaId);
    }else{
      this.iniciarNoticia();
    }
  }

  obtenerNotcias(){
    if(this.noticiaId){
      this.NoticiaService.getAllNoticias().subscribe(data => {
        this.noticias = data;
      });
    }
  }

  iniciarImagenes = () => {
    this.formGroupNoticiasEditImagenes = this.formBuilder.group({
      imagenes: this.formBuilder.array([Validators.required])
    });
  }

  iniciarNoticia = () => {
    this.formGroup = this.formBuilder.group({
      Id: ['',[]],
      Titulo: ['', [Validators.required]],
      Descripcion: ['', [Validators.required, Validators.minLength(15)]],
      imagenes: this.formBuilder.array([Validators.required]),
    });
  }

  cargarNoticia = (id: string) => {
    this.NoticiaService.getAllNoticias().subscribe(data => {
      debugger
      this.noticias = data;
      this.noticias.forEach(noticia => {
        if (noticia.Id == id) {
          this.formGroup.patchValue({
            Id: id,
            Titulo: noticia.Titulo,
            Descripcion: noticia.Descripcion
          });

          (<FormArray>this.formGroup.controls['imagenes']).removeAt(0);
           this.agregarImagenEdit(noticia.Imagen);
     
        }
      });
    });
  
  
  } 

  guardarData() {
   if (this.formGroup.valid){
     let noticia:Noticia = {
       Descripcion : this.formGroup.value.Descripcion,
       Imagen : this.formGroup.value.imagenes[0],
       Titulo : this.formGroup.value.Titulo,
       Id : ''
     } 

     if(!this.noticiaId){
      noticia.Imagen = '';
      this.NoticiaCreatedId = this.NoticiaService.saveNoticia(noticia);
      swal("Noticia Creada", "Exito", "success");
     }else{
      noticia.Id = this.noticiaId;
      this.NoticiaService.saveNoticia(noticia);
      swal("Noticia Modificada", "Exito", "success");
      this.router.navigateByUrl('inicio');
     }
      
   }
  }


borrarImagen = ($event, index) => { 
    (<FormArray>this.formGroupNoticiasEditImagenes.controls['imagenes']).removeAt(index); 
}

borrarImagenEdit = ($event, index) => { 
  (<FormArray>this.formGroup.controls['imagenes']).removeAt(index); 
}

agregarImagen = (imagen?: string, ) => {
  (<FormArray>this.formGroupNoticiasEditImagenes.controls['imagenes']).push(
    new FormControl(imagen, Validators.required)
  );
}

agregarImagenEdit = (imagen?: string, ) => {
  (<FormArray>this.formGroup.controls['imagenes']).push(
    new FormControl(imagen, Validators.required)
  );
}

detectFiles(event: any) {
  this.selectedFiles = event.target.files;
}

uploadSingle() {
  let file = this.selectedFiles.item(0);
  this.currentUpload = new Upload(file);
  if(this.NoticiaCreatedId){
    this.upLoadServiceService.pushUpload(this.currentUpload, this.NoticiaCreatedId,'noticias');
  }
  if(this.noticiaId){
    this.upLoadServiceService.pushUpload(this.currentUpload, this.noticiaId,'noticias');     
  }
}



}

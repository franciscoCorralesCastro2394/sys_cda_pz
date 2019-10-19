import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { DataStorageService} from '../../services/data-storage.service';
import { SafeResourceUrl } from '@angular/platform-browser';
import { comentario } from '../../interfaces/comentario.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { calificacion } from '../../interfaces/calificacion.interfaces';
import { LoginService } from '../../services/loginSeguro/login.service';
import { SitioServiceService } from '../../services/sitiosServices/sitio-service.service';
import { CalificacionesServiceService } from '../../services/calificacionesService/calificaciones-service.service';
import { ComentariosService } from '../../services/comentariosServices/comentarios.service';
import { RespuestasServiceService } from '../../services/respuestasService/respuestas-service.service';
import { Respuesta } from '../../interfaces/respuesta.interface';
import swal from 'sweetalert'; 
import { Usuario } from 'src/app/interfaces/heroes.interfaces';



@Component({
  selector: 'app-sitio',
  templateUrl: './sitio.component.html',
  styleUrls: ['./sitio.component.css']
})
export class SitioComponent implements OnInit {
  sitioId:string;
  sitios:any[] = []; 
  imgsSitio:any[] = [];
  resenas:comentario[] = [];
  sitiosValoraciones:calificacion[] = [];
  sitio:any;
  urlYB: SafeResourceUrl;
  urlYoutube:string="https://www.youtube.com/embed/N0fVdcOg94I";
  formGroupComentario:FormGroup;
  userAdmin:boolean = false;
  idResena:any;
  respuestas:Respuesta[] = [];
  userLogin:Usuario;
  userId:string;

  constructor(private dataStorageService:DataStorageService,  
              private activatedRoute:ActivatedRoute,
              private formBuilder:FormBuilder,
              private loginService:LoginService,
              private sitioServiceService:SitioServiceService,
              private calificacionesServiceService:CalificacionesServiceService,
              private respuestasServiceService:RespuestasServiceService,
              private comentariosService:ComentariosService) {
    this.sitioId = this.activatedRoute.snapshot.params['id'];
    

    this.respuestasServiceService.getAllRespuestas().subscribe(data => {
      this.respuestas = data;
    });
    
    this.sitioServiceService.getAllSitios().subscribe(data => {
      this.sitios = data;
      this.cargarSitio();
      this.imgsSitio = this.sitio.imgs;
    });
    
    this.getResenas();

    this.getValoraciones();

    this.iniciarResponder();

    this.userId = this.dataStorageService.getObjectValue("UserNow");
    this.loginService.setCurrentUser(this.userId); 
  }

  ngOnInit() {
    setTimeout(() => {
      let user:Usuario =  this.loginService.getUsuario();
      if(user.roles.includes('Admin')){
        this.userAdmin = true;
      }else{
        this.userAdmin = false;
      }
      
    }, 2000);
  }
  

   getResenas(){
    this.comentariosService.getAllComentarios().subscribe(data =>{
      this.resenas = data;
      this.resenas = this.resenas.filter(x => x.idSitio == this.sitioId && x.sensuardo != true);

      for(let i = 0; i < this.resenas.length; i++)
      {
        this.resenas[i].nombreSitio = this.nombreSitio(this.resenas[i].idSitio);
      }
      
      this.respuestasServiceService.getAllRespuestas().subscribe(dataRes => {
                this.respuestas = dataRes;
                this.resenas.forEach(res => {
                  let respRes:Respuesta[] = [];
                  this.respuestas.forEach(resp => {
                    if(resp.idResena == res.id && resp.idSitio == this.sitioId){
                      respRes.push(resp);
                    }
                  });    
               res.respuestas = respRes;
               
             });
      });
    });
    
   }

   getValoraciones(){
     
    this.calificacionesServiceService.getAllCalificaciones().subscribe(data => {
      this.sitiosValoraciones = data;
      this.sitiosValoraciones = this.sitiosValoraciones.filter(x => x.idSitio == this.sitioId);
      for(let i = 0; i < this.sitiosValoraciones.length; i++)
      {
        this.sitiosValoraciones[i].img = this.imgSitio(this.sitiosValoraciones[i].idSitio);
      }
    });
    
   
   }

  cargarSitio(){
    this.sitios.forEach((sitio) => {
      if (sitio.id == this.sitioId) {
        this.sitio = sitio;
      }
    });
  }


  iniciarResponder = () => {
    this.formGroupComentario = this.formBuilder.group({
      Respuesta: ['', [Validators.required]]
    });
  }

  
  nombreSitio(id:string){
    let nombre:string = "Nombre no encontrado";
    this.sitios.forEach( sit => {
        if(sit.id == id){
          nombre = sit.nombre;
        }
    });

    return nombre;
  }


  imgSitio(id:string){
    let img:string = "assets/img/adventure-clouds-environment-672358.jpg";
    this.sitios.forEach( sit => {
        if(sit.id == id){
          img = sit.imgs[0];
        }
    });
    return img;
  }

 
  saveRespueta(){
    let res:Respuesta = {
      id : '',
      idResena : this.idResena,
      idSitio :   this.sitioId,
      idUsuario : this.userId,
      respuesta : this.formGroupComentario.value.Respuesta,
      key$ : ""      
    };
     this.iniciarResponder();
    this.respuestasServiceService.saveRespuetas(res);
    swal("Comentario Guardado", "Exito", "success");
  }
   

  sensurarcomentario(id:any){
   this.resenas.forEach( res => {
      if(res.id == id){
        res.sensuardo = true;
        this.comentariosService.saveComentario(res);
        swal("Comentario sensurado", "Exito", "success");
      }
   });
  }
}

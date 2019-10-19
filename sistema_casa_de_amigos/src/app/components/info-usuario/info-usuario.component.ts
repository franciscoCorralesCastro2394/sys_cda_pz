import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';
import { ComentariosService } from '../../services/comentariosServices/comentarios.service';
import { CalificacionesServiceService } from '../../services/calificacionesService/calificaciones-service.service';
import { SitioSeguidoServiceService } from '../../services/sitioSeguido/sitio-seguido-service.service';
import { RespuestasServiceService } from '../../services/respuestasService/respuestas-service.service';
import { SitioServiceService } from '../../services/sitiosServices/sitio-service.service';
import { sitioSeguido } from '../../interfaces/sitiosSeguidos.interfaces';
import { comentario } from '../../interfaces/comentario.interface';
import { calificacion } from '../../interfaces/calificacion.interfaces';
import { Respuesta } from '../../interfaces/respuesta.interface';

@Component({
  selector: 'app-info-usuario',
  templateUrl: './info-usuario.component.html',
  styleUrls: ['./info-usuario.component.css']
})
export class InfoUsuarioComponent implements OnInit {
  userId:string;
  users:any[] = [];
  sitios:any[] = [];
  sitiosS:any[] = [];
  resenas:comentario[] = [];
  sitiosUsuario:[] = [];
  calificaciones:calificacion[] = []; 
  sitiosSeguidos:sitioSeguido[] = [];
  userLogin:any;
  nombre:string;
  img:string;
  respuestas:Respuesta[] = [];




  constructor(private activatedRoute:ActivatedRoute,
              private usuariosService:UsuariosService,
              private comentariosService:ComentariosService,
              private sitioSeguidoServiceService:SitioSeguidoServiceService,
              private sitioServiceService:SitioServiceService,
              private calificacionesServiceService:CalificacionesServiceService,
              private respuestasServiceService:RespuestasServiceService){

    this.userId = this.activatedRoute.snapshot.params['user'];
    
 
     this.cargarUsuario();

    // this.getSitios(); 
   
    // this.getResenas();

    // this.getCalificacones();
  
   }
  ngOnInit() {
  }


cargarUsuario(){
    this.usuariosService.getAllUaurios().subscribe(data => {
      this.users = data;
        this.users.forEach((user) => {
          if (user.Email === this.userId) {
            this.userLogin = user;
            this.nombre = this.userLogin.FirstName + '  ' + this.userLogin.LastName;
            this.img = this.userLogin.Imagen;
           }
         });
    });
  }

  getResenas(){

    this.comentariosService.getAllComentarios().subscribe(data => {
      this.resenas = data;
      this.resenas = this.resenas.filter(x => x.idUsuario == this.userId);
      for(let i=0; i < this.resenas.length; i++){
        this.resenas[i].nombreSitio = this.nombreSitio(this.resenas[i].idSitio);
      }
              this.respuestasServiceService.getAllRespuestas().subscribe(dataResp => {
                      this.resenas.forEach(res => {
                        let respRes:Respuesta[] = [];
                        this.respuestas.forEach(resp => {
                          if(+resp.idResena == +res.id){
                            respRes.push(resp);
                          }
                        }); 
                         res.respuestas = respRes;
                         });
              });
    });
   
  }

  getCalificacones(){
    this.calificacionesServiceService.getAllCalificaciones().subscribe(data => {
      this.calificaciones = data;
      this.calificaciones.filter(x => x.idUsuario == this.userId);
      for(let i=0; i < this.calificaciones.length; i++){
        this.calificaciones[i].img = this.imgSitio(this.calificaciones[i].idSitio);
        this.calificaciones[i].nombreSitio = this.nombreSitio(this.calificaciones[i].idSitio);
      }
    });
  }

  getSitios(){
    this.sitioServiceService.getAllSitios().subscribe(data => {
      this.sitios = data;
      this.sitioSeguidoServiceService.getAllSitiosSeguidos().subscribe(sitiosS => {
        this.sitiosSeguidos = sitiosS;
        this.sitiosSeguidos = this.sitiosSeguidos.filter(x => x.idUsuario == this.userId);
        this.sitiosSeguidos.forEach(sitS => {
          this.sitios.forEach(sit => {
            if(sit.id == sitS.idSitio){
               this.sitiosS.push(sit);
            }
          }); 
        }); 
      });
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


  imgSitio(id:any){
    let img:string = "assets/img/adventure-clouds-environment-672358.jpg";
    this.sitios.forEach( sit => {
        if(sit.id == id){
          img = sit.imgs[0];
        }
    });

    return img;
  }
}

import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { Observable } from 'rxjs';
import { NoticiaServiceService } from '../../services/noticiasServices/noticia-service.service';

@Component({
  selector: 'app-noticias-list',
  templateUrl: './noticias-list.component.html',
  styleUrls: ['./noticias-list.component.css']
})
export class NoticiasListComponent implements OnInit {
  noticias$:Observable<any>;  
  constructor(private router:Router,
              private noticiaServiceService:NoticiaServiceService) {
     this.getNoticias();
  }
   
   editarNoticia(noti:any){
     this.router.navigate(['/private/editar-noticia/',noti.Id]);
   }

  ngOnInit() {
  }

  getNoticias = () => {
    this.noticias$ = this.noticiaServiceService.getAllNoticias();
  }
}

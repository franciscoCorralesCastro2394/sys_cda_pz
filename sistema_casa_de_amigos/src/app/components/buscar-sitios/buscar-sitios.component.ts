import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SitioServiceService } from '../../services/sitiosServices/sitio-service.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-buscar-sitios',
  templateUrl: './buscar-sitios.component.html',
  styleUrls: ['./buscar-sitios.component.css']
})
export class BuscarSitiosComponent implements OnInit {

  constructor(private data:SitioServiceService, 
    private activateRoute: ActivatedRoute,
    private router: Router) { }

  sitios$:Observable<any>;
  termino:string;
  
  ngOnInit() {
  	this.activateRoute.params.subscribe(params => {
      this.termino = params['id'];
   });
   this.sitios$ = this.data.searchSitio(this.termino);
  }
  
  buscarSitio(value:string){
    this.sitios$ = this.data.searchSitio(value);
  }

  verMas(route: string){
    this.router.navigateByUrl('/private/sitio/' + route);
  }







}

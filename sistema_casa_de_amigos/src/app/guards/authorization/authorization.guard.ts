import swal from 'sweetalert';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { DataStorageService } from 'src/app/services/data-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate {
  path: ActivatedRouteSnapshot[]; route: ActivatedRouteSnapshot;
  
  constructor(private dataStorageService:DataStorageService ) {}
  
  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
  //    let roles:string =  this.dataStorageService.getObjectValue('roles'); 
  //   if(this.dataStorageService.getObjectValue('UserNow') && roles){
  //     if(roles.includes(route.data.role)){
  //       return true;
  //     }else{
  //     swal("Error de autorización", "Intente de nuevo", "error");
  //    return false;
  //   }
  //   }else{
  //     swal("Error sin credenciales", "Intente hacer ingreso", "error");
  //   }
    
  // }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let roles:string =  this.dataStorageService.getObjectValue('roles'); 
    for (var i = 0; i < route.data.role.length; i++) {
      if(this.dataStorageService.getObjectValue('UserNow') && roles){
         if(roles.includes(route.data.role[i])){
           return true;
         }
       }
    }
    swal("Error de autorización", "Intente de nuevo", "error"); 
    
    return false;
 }


}



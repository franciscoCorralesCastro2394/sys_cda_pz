import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router'; 
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import swal from 'sweetalert';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements  CanActivate{
  path: ActivatedRouteSnapshot[];  route: ActivatedRouteSnapshot;
  constructor(private angularFireAuth: AngularFireAuth,
    private router: Router) { }

    canActivate(  route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot 
   ): Observable<boolean> {
      return new Observable(observer => {
          if (this.angularFireAuth.auth.currentUser) {
              observer.next(true);
          }
          else {
            swal("No cuenta con la credenciales de Autrntificación", "Intente de nuevo", "error");
            this.router.navigateByUrl('/inicio/');
              observer.next(false);
          }
      })
  }

  
}

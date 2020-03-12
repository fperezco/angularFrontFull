import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VerificaRenovacionGuard implements CanActivate {
  
  constructor(public usuarioService:UsuarioService, public router: Router){

  }
  
  canActivate():  Promise<boolean> | boolean {
    console.log("ejecutando verifica tiempo token guard");
    //verificamos el token, obtenemos la fecha de expiración
    let token = this.usuarioService.token;
    let payload = JSON.parse(atob(token.split('.')[1]));
    //console.log(payload);
    //comprobamos si ha expirado
    let expirado = this.verificarExpiracion(payload.exp);

    if(expirado){
      this.router.navigate(['/login']);
      return false;
    }
    return this.verificarRenovar(payload.exp);
  }


  verificarRenovar( fechaExp: number): Promise<boolean>{
    return new Promise ( ( resolve, reject)=> {
      
      let tokenExp = new Date( fechaExp * 1000); //pasamos a milis
      let ahora = new Date();

      //sumo 1 h
      ahora.setTime( ahora.getTime() + ( 1*60*60*1000));

      console.log("token time=",tokenExp);
      console.log("ahora +4h time=",ahora);


      if(tokenExp.getTime() > ahora.getTime()){
        //aun faltan mas de 1h para que expire => no hago nada
        console.log("aun falta mas de 1 hora para que expire el token => no autorenuevo");
        resolve(true);
      }
      else { //el token esta proximo a expirar => renuevo automaticamente
        console.log("token proximo a espirar, menos de 1 h => autorenuevo");
        this.usuarioService.renuevaToken()
        .subscribe( () => {
          resolve(true);
        }),
         () => {
          this.router.navigate(['/login']);
          reject(false);
        };
      }



    });
  }

  verificarExpiracion(fechaExp: number){
    let ahora = new Date().getTime() / 1000; //pasar a segundos

    if(fechaExp < ahora){
      return true; //ha expirado pk ahora es mayor
    }
    else{
      return false; // no ha expirado
    }
  }
  
}

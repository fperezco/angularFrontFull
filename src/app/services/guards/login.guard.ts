import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: "root"
})
export class LoginGuard implements CanActivate {

  constructor(
    private UsuarioService: UsuarioService,
    private router: Router){

  }
  canActivate() {
    if( this.UsuarioService.estaLogueado()){
      console.log("pasa por login guard");
      return true;
    }
    else{
      console.log("bloqueado por guard");
      this.router.navigate(['login']);
      return false;
    }

  }
}

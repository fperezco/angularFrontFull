import { Injectable } from "@angular/core";
import { Usuario } from "../../models/usuario.model";
import { map } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { URL_SERVICIOS } from "../../config/config";

@Injectable({
  providedIn: "root"
})
export class UsuarioService {
  baseUrl = URL_SERVICIOS;

  constructor(private http: HttpClient) {}

  login(usuario: Usuario, recuerdame: boolean = false) {

    if(recuerdame){
      localStorage.setItem('email',usuario.email);
    }
    else {
      localStorage.removeItem('email');
    }

    //return this.http.post(`${this.baseUrl}/login`, {"email":usuario.email,"password":usuario.password}).pipe(
    return this.http.post(`${this.baseUrl}/login`, usuario).pipe(
      map((resp: any) => {
        //return resp;
        localStorage.setItem('id',resp.id);
        localStorage.setItem('usuario',JSON.stringify(resp.usuario));
        localStorage.setItem('token',resp.token);
        return true;
      })
    );
  }

  crearUsuario(usuario: Usuario) {
    return this.http.post(`${this.baseUrl}/usuarios`, usuario).pipe(
      map((resp: any) => {
        return resp;
      })
    );
  }
}

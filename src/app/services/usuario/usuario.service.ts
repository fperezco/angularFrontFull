import { Injectable } from "@angular/core";
import { Usuario } from "../../models/usuario.model";
import { map } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { URL_SERVICIOS } from "../../config/config";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class UsuarioService {
  baseUrl = URL_SERVICIOS;
  usuario: Usuario;
  token: string;

  constructor(private http: HttpClient, public router: Router) {
    this.cargarTokenStorage();
  }

  //consume el webservice que loguea un usuario
  /*
  Si esta activo el recuerdame lo guarda en localstorage
  sino lo borra de alli => este sera consultado en la pantalla de login
  para ser rescatado o no
  */
  login(usuario: Usuario, recuerdame: boolean = false) {
    if (recuerdame) {
      localStorage.setItem("email", usuario.email);
    } else {
      localStorage.removeItem("email");
    }

    //return this.http.post(`${this.baseUrl}/login`, {"email":usuario.email,"password":usuario.password}).pipe(
    return this.http.post(`${this.baseUrl}/login`, usuario).pipe(
      map((resp: any) => {
        //return resp;
        this.guardarStorage(resp.id, resp.token, resp.usuario);
        return true;
        /*localStorage.setItem("id", resp.id);
        localStorage.setItem("usuario", JSON.stringify(resp.usuario));
        localStorage.setItem("token", resp.token);

        this.usuario = resp.usuario;
        this.token = resp.token;
        return true;*/
      })
    );
  }

  guardarStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem("id", id);
    localStorage.setItem("usuario", JSON.stringify(usuario));
    localStorage.setItem("token", token);

    this.usuario = usuario;
    this.token = token;
  }

  loginGoogle(token: any) {
    //return this.http.post(`${this.baseUrl}/google`, {"token":token}).pipe(
    return this.http.post(`${this.baseUrl}/google`, { token }).pipe(
      map((resp: any) => {
        //return resp;
        this.guardarStorage(resp.id, resp.token, resp.usuario);
        return true;
      })
    );
  }

  // consume el webservice que crea un usuario
  crearUsuario(usuario: Usuario) {
    return this.http.post(`${this.baseUrl}/usuarios`, usuario).pipe(
      map((resp: any) => {
        return resp;
      })
    );
  }

  updateUsuario(usuario: Usuario) {
    
    //return this.http.put(`${this.baseUrl}/usuarios/${usuario._id}`, usuario);
    return this.http.put(`${this.baseUrl}/usuarios/${usuario._id}`, usuario).pipe(
      map((resp: any) => {
        return resp;
      })
    );
  }

  // si existe info de token la carga en el servicio
  cargarTokenStorage() {
    if (localStorage.getItem("token")) {
      this.token = localStorage.getItem("token");
      this.usuario = JSON.parse(localStorage.getItem("usuario"));
    } else {
      this.token = "";
      this.usuario = null;
    }
  }

  // Nos indica si esta logueado o no, vamos si existe token valido o no
  // el backend esta protegido aunke esto parezca failable y facilmente falsificable
  estaLogueado() {
    return this.token.length > 5;
  }

  //elimina del localstorage y las variables
  //claro, como lo tengo hecho en el otro ejercicio es mejor,
  //consumiendo un webservice que marca como invalido dicho token por si acaso
  logout() {
    this.usuario = null;
    this.token = "";
    localStorage.removeItem("usuario");
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    this.router.navigate(["/login"]);
  }

  getImagenUsuario(){
    return this.usuario.img;
  }
}

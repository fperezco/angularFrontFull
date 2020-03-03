import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { UsuarioService } from "../services/service.index";
import swal from "sweetalert";
import { Usuario } from "../models/usuario.model";

//login con google
declare const gapi: any;

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styles: []
})
export class LoginComponent implements OnInit {
  recuerdame: boolean = false;
  email: string;

  auth2: any;

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  ngOnInit() {
    //inicializar el login con google
    this.googleInit();

    //funcion del recuerdame, si existe seteamos el mail
    this.email = localStorage.getItem("email") || "";

    if (this.email.length > 1) {
      this.recuerdame = true;
    }
  }

  //inicializar el login con google
  googleInit() {
    gapi.load("auth2", () => {
      this.auth2 = gapi.auth2.init({
        client_id:
          "846283999224-qu7ir0svbbrgbt5miouodqcur1dh25mm.apps.googleusercontent.com",
        //cookiepolicy: 'single_host_origin',
        scope: "profile email"
      });
      this.attachSignin(document.getElementById("btnGoogle"));
    });
  }

  //atachear la funcionalidad al boton
  attachSignin(element) {
    this.auth2.attachClickHandler(element, {}, googleUser => {
      //let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;
      console.log("login con google", token);

      this.usuarioService.loginGoogle(token).subscribe(
        (resp: any) => {
          console.log(resp);
          //this.router.navigateByUrl("dashboard");
          //usado pk por alguna razon cuando viene de google hay que hacer un refresh
          window.location.href = "#/dashboard";
        },
        err => {
          console.log("ERROR", err.error.mensaje);
          swal("Error login", err.error.mensaje, "error");
        }
      );
    });
  }

  //form aproximacion por template, los campos tienen name y ngModel
  //y en submit paso el formulario
  ingresar(forma: NgForm) {
    //aki por fuerza el formulario ya es valido
    let usuario = new Usuario(null, forma.value.email, forma.value.password);

    this.usuarioService.login(usuario, forma.value.recuerdame).subscribe(
      (resp: any) => {
        console.log(resp);
        this.router.navigateByUrl("dashboard");
      },
      err => {
        console.log("ERROR", err.error.mensaje);
        swal("Error login", err.error.mensaje, "error");
      }
    );
  }
}

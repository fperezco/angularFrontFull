import { Component, OnInit } from "@angular/core";
import { Usuario } from "../../models/usuario.model";
import { UsuarioService } from "../../services/usuario/usuario.service";
import { NgForm } from "@angular/forms";
import swal from 'sweetalert';

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styles: []
})
export class ProfileComponent implements OnInit {
  usuario: Usuario;
  constructor(private usuarioService: UsuarioService) {}

  ngOnInit() {
    this.usuario = this.usuarioService.usuario;
  }

  /*actualizarPerfil(forma: NgForm){
    console.log("actualizar",forma.value);
  }*/

  actualizarPerfil() {
    console.log("actualizar");
    this.usuarioService.updateUsuario(this.usuario).subscribe(
      (resp: any) => {
        console.log("usuario actualizado con exito");
        //this.usuario = resp.usuario; //traigo todos los campos actualizados
        //esto no me gusta nada, actualizar el usuario en el localstorage
        this.usuarioService.guardarStorage(resp.usuario._id,this.usuarioService.token,resp.usuario);
        swal("Usuario actualizado", "Usuario actualizado","success");
      },
      error => {
        console.log("error actualizando usuario", error);
      }
    );
  }
}

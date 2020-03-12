import { Component, OnInit } from "@angular/core";
import { Usuario } from "../../models/usuario.model";
import { UsuarioService } from "../../services/usuario/usuario.service";
import { NgForm } from "@angular/forms";
import swal from "sweetalert";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styles: []
})
export class ProfileComponent implements OnInit {
  usuario: Usuario;
  imagenSubir: File;
  imagenTemp: string;

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit() {
    this.usuario = this.usuarioService.usuario;
  }

  /**
   * Actualizo el nombre y el email del usuario
   */
  actualizarPerfil() {
    console.log("actualizar");
    this.usuarioService.updateUsuario(this.usuario).subscribe(
      (resp: any) => {
        console.log("usuario actualizado con exito");
        //this.usuario = resp.usuario; //traigo todos los campos actualizados
        //esto no me gusta nada, actualizar el usuario en el localstorage
        this.usuarioService.guardarStorage(
          resp.usuario._id,
          this.usuarioService.token,
          resp.usuario,
          resp.menu
        );
        swal("Usuario actualizado", "Usuario actualizado", "success");
      },
      error => {
        console.log("error actualizando usuario", error);
      }
    );
  }

  /**
   * Invocado del evento onchange del boton examinar, ya me envia
   * el objeto File tal que :
   * seleccionImagen($event.target.files[0])"
   * @param archivo
   */
  seleccionImagen(archivo: File) {
    if (!archivo) {
      this.imagenSubir = null;
      return;
    }

    //console.log(archivo);
    //comprobacion light de que es una imagen
    if (archivo.type.indexOf("image") < 0) {
      swal("solo imagenes", "solo imagenes", "error");
      this.imagenSubir = null;
      return;
    }

    //la muestro temporalmente
    this.cargarImagenTemporalmente(archivo);

    //la seteo para subir a la espera de confirmacion en el boton
    this.imagenSubir = archivo;
  }

  /**
   * Mediante vanillaJS obtengo el base64 de la imagen temporal
   * y la cargo en el <img>
   * @param archivo 
   */
  cargarImagenTemporalmente(archivo: File) {
    //obtengo la imagen en base 64
    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onloadend = () => {
      this.imagenTemp = reader.result as string;
    };
  }

  /**
   * Invoco el webservice que sube la imagen y guarda los cambios
   * en el objeto cuyo id ha sido pasado
   */
  cambiarImagen() {
    this.usuarioService.cambiarImagen(this.imagenSubir, this.usuario._id);
  }
}

import { Component, OnInit } from "@angular/core";
import { SubirArchivoService } from "../../services/subirArchivo/subir-archivo.service";
import swal from "sweetalert";
import { ModalUploadService } from "./modal-upload.service";

/**
 * Componente compartido para actualizar imagenes de cualquier recurso
 */

@Component({
  selector: "app-modal-upload",
  templateUrl: "./modal-upload.component.html",
  styles: []
})
export class ModalUploadComponent implements OnInit {
  imagenSubir: File;
  imagenTemp: string;

  // uso el servicio intermedio modalUploadService para comunicarme con el exterior
  constructor(
    public subirArchivoService: SubirArchivoService,
    public modalUploadService: ModalUploadService
  ) {
    console.log("modal listo");
  }

  ngOnInit() {}

  ocultar() {
    this.imagenSubir = null;
    this.imagenTemp = null;
    this.modalUploadService.ocultarModal();
  }

  subirImagen() {
    this.subirArchivoService
      .subirArchivo(
        this.imagenSubir,
        this.modalUploadService.tipo,
        this.modalUploadService.id
      )
      .then(resp => {
        //console.log("emit", resp);
        this.modalUploadService.notificacion.emit(resp);
        this.ocultar();
      })
      .catch(err => {});
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
}

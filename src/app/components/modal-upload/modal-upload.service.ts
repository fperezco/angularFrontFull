import { Injectable, EventEmitter } from "@angular/core";

/**
 * Servicio usado para comunicar este modal con el exterior...
 * en lugar de pasar el tipo y el id por input/output
 */
@Injectable({
  providedIn: "root"
})
export class ModalUploadService {
  public tipo: string;
  public id: string;

  public oculto: string = "oculto"; //clase "oculto"

  // notificar cuando se sube la imagen, el objeto respuesta del servicio
  // de carga de imagen
  public notificacion = new EventEmitter<any>();

  constructor() {
    console.log("modal service listo");
  }

  ocultarModal() {
    this.oculto = "oculto";
    this.id = null;
    this.tipo = null;
  }

  mostrarModal(tipo: string, id: string) {
    this.oculto = "";
    this.id = id;
    this.tipo = tipo;
  }
}

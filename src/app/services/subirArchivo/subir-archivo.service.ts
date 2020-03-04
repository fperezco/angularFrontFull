import { Injectable } from "@angular/core";
import { URL_SERVICIOS } from "../../config/config";

@Injectable({
  providedIn: "root"
})
export class SubirArchivoService {
  constructor() {}

  /**
   * Subir archivo generico
   * @param archivo File
   * @param tipo string
   */
  subirArchivo(archivo: File, tipo: string, id: string) {
    return new Promise((resolve, reject) => {
      //lo hacemos con una peticion ajax
      let formData = new FormData();
      let xhr = new XMLHttpRequest();

      //nbr del campo del webservice
      formData.append("imagen", archivo, archivo.name);

      xhr.onreadystatechange = function() {
        //4 == cuando termina el proceso...
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log("imagen subida");
            resolve(JSON.parse(xhr.response)); //OJO PK XHR.RESPONSE DEVUELVE STRING
          } else {
            console.log("fallo la subida");
            reject(JSON.parse(xhr.response));
          }
        }
      };

      let url = URL_SERVICIOS + "/upload/" + tipo + "/" + id;

      xhr.open("PUT", url, true);
      xhr.send(formData);
    });
  }
}

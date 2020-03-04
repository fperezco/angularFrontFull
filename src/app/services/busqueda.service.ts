import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { URL_SERVICIOS } from "../config/config";

@Injectable({
  providedIn: "root"
})
export class BusquedaService {
  baseUrl = URL_SERVICIOS;

  constructor(private http: HttpClient) {}

  buscarElemento(cadena: string, tipo: string) {
    let url = this.baseUrl + "/coleccion/" + tipo + "/" + cadena;
    return this.http.get(url);
  }
}

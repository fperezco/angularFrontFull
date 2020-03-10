import { Injectable } from "@angular/core";
import { Usuario } from "../../models/usuario.model";
import { map } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { SubirArchivoService } from '../subirArchivo/subir-archivo.service';
import swal from 'sweetalert';
import { Medico } from '../../models/medico.model';
import { URL_SERVICIOS } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  baseUrl = URL_SERVICIOS;
  usuario: Usuario;
  token: string;

  constructor(
    private http: HttpClient,
     public router: Router,
     public subirArchivoService:SubirArchivoService) {
  }



  // consume el webservice que crea un usuario
  crearMedico(medico: Medico) {
    console.log("servicio crear medico", medico);
    return this.http.post(`${this.baseUrl}/medicos`, medico).pipe(
      map((resp: any) => {
        return resp;
      })
    );
  }

  updateMedico(medico: Medico) {
    return this.http.put(`${this.baseUrl}/medicos/${medico._id}`, medico).pipe(
      map((resp: any) => {
        return resp;
      })
    );
  }

    // consume el webservice que crea un medico
    deleteMedico(medico: Medico) {
      return this.http.delete(`${this.baseUrl}/medicos/${medico._id}`);
    }



  /**
   * Cambio la imagen para un objeto usuario, dada la imagen y su id
   * @param file 
   * @param id 
   */
  cambiarImagen(file: File, id:string){

    this.subirArchivoService.subirArchivo(file,"medicos",id)
      .then( (resp: any) => {
        console.log(resp.medico);
        console.log("resp.medico = ",resp.medico);
      })
      .catch ( resp => {
        console.log("error",resp);
      });

  }

  getMedicos(offset: number = 0,limit: number = 5){
    return this.http.get(`${this.baseUrl}/medicos?desde=${offset}&limite=${limit}`);
  }

  getMedico(id:string){
    return this.http.get(`${this.baseUrl}/medicos/${id}`);
  }
}  


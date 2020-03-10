import { Injectable } from "@angular/core";
import { Usuario } from "../../models/usuario.model";
import { map } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { SubirArchivoService } from '../subirArchivo/subir-archivo.service';
import swal from 'sweetalert';
import { Hospital } from '../../models/hospital.model';
import { URL_SERVICIOS } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  baseUrl = URL_SERVICIOS;
  usuario: Usuario;
  token: string;

  constructor(
    private http: HttpClient,
     public router: Router,
     public subirArchivoService:SubirArchivoService) {
  }



  // consume el webservice que crea un usuario
  crearHospital(hospital: Hospital) {
    console.log("servicio crear hospital", hospital);
    return this.http.post(`${this.baseUrl}/hospitales`, {"nombre": hospital.nombre}).pipe(
      map((resp: any) => {
        return resp;
      })
    );
  }

  updateHospital(hospital: Hospital) {
    return this.http.put(`${this.baseUrl}/hospitales/${hospital._id}`, hospital).pipe(
      map((resp: any) => {
        return resp;
      })
    );
  }

    // consume el webservice que crea un usuario
    deleteHospital(hospital: Hospital) {
     /* return this.http.delete(`${this.baseUrl}/hospitales/${hospital._id}`).pipe(
        map((resp: any) => {
          return resp;
        })
      );*/
      return this.http.delete(`${this.baseUrl}/hospitales/${hospital._id}`);
    }




  /**
   * Cambio la imagen para un objeto usuario, dada la imagen y su id
   * @param file 
   * @param id 
   */
  cambiarImagen(file: File, id:string){

    this.subirArchivoService.subirArchivo(file,"hospitales",id)
      .then( (resp: any) => {
        console.log(resp.hospital);
        console.log("resp.hospital = ",resp.hospital);
      })
      .catch ( resp => {
        console.log("error",resp);
      });

  }


  getHospitales(offset: number = 0,limit: number = 5){
    return this.http.get(`${this.baseUrl}/hospitales?desde=${offset}&limite=${limit}`);
  }

  getHospital(id: string){
    return this.http.get(`${this.baseUrl}/hospitales/${id}`);
  }


}

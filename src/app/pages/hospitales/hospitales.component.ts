import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../services/hospital/hospital.service';
import { Hospital } from '../../models/hospital.model';
import { BusquedaService } from '../../services/busqueda.service';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import swal from 'sweetalert';

//declare var swal: any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.css']
})
export class HospitalesComponent implements OnInit {
  hospitales: Hospital[];
  total: number;
  registrosPorPagina: number = 3;
  ultimo: number = 0;

  constructor(
    private hospitalService: HospitalService,
    private busquedaService: BusquedaService,
    public modalUploadService: ModalUploadService
  ) {}


  ngOnInit() {
    this.getAllHospitals(0,this.registrosPorPagina);

    //me subscribo de forma que si se cambia la imagen de un hospital automaticamente reload
    this.modalUploadService.notificacion
    .subscribe ( resp => {
      this.getAllHospitals(0,this.registrosPorPagina);
    });

  }

  mostrarModalCambioImg(id){
    this.modalUploadService.mostrarModal("hospitales",id);
  }

  getAllHospitals(offset:number = 0,limit: number = 5) {
    this.hospitalService.getHospitales(offset,limit).subscribe((resp: any) => {
      console.log("hospitales obtenidos", resp);
      this.hospitales = resp.hospitales;
      this.total = resp.total;
      console.log("ultimo = ", this.ultimo);
      console.log("hospitales",this.hospitales);
    });
  }

  /**
   * Busco por dicha cadena en cada evento on input del input de busqueda
   * @param cadena 
   */
  buscar(cadena: string) {
    console.log("buscando", cadena);
    if (cadena === "") {
      this.getAllHospitals(0,this.registrosPorPagina);
    } else {
      this.busquedaService
        .buscarElemento(cadena, "hospitales")
        .subscribe((resp: any) => {
          this.hospitales = resp.hospitales;
          this.total = resp.total;
        });
    }
  }

  siguiente(){
    this.ultimo = this.ultimo += this.registrosPorPagina;
    this.getAllHospitals(this.ultimo,this.registrosPorPagina);
  }

  anterior(){
    this.ultimo = this.ultimo-this.registrosPorPagina
    this.getAllHospitals(this.ultimo,this.registrosPorPagina);
  }

  cambioItemsPerPage(registrosPagina: number){
    this.ultimo = 0;
    this.registrosPorPagina = registrosPagina;
    this.getAllHospitals(this.ultimo,this.registrosPorPagina);
  }


  actualizarHospital(hospital: Hospital){
    this.hospitalService.updateHospital(hospital)
    .subscribe(  (resp: any) => {
      // this.video = resp.data; //pk delete no me esta devolviendo nada
      console.log('en compomente actu hospital:', hospital);
      swal("Hospital actualizado correctamente","", "success");
    },
    (error) => {
      console.log('Error en update ',error);
      swal("error actualizando hospital", "error");
    });
  }


  crearHospital(){
    swal({
      text: 'Introduzca nombre hospital',
      content: "input",
      type: 'warning',
      buttons: true
    })
    .then(name => {
      if (!name) throw null;
     
      console.log("hospital = ", name);
      var hospital = new Hospital(name,null);
      console.log("conformando hospital", hospital);
      this.hospitalService.crearHospital(hospital)
        .subscribe(  (resp: any) => {
          // this.video = resp.data; //pk delete no me esta devolviendo nada
          console.log('en compomente actu hospital:', resp);
          swal("Hospital creado correctamente","", "success");
          this.getAllHospitals(0,this.registrosPorPagina);
        },
        (error) => {
          console.log('Error en update ',error);
          swal("error creando hospital", "error");
        });

    });

  }


  borrarHospital( hospital: Hospital){

      //confirmamos
      swal( {
        title: "¿esta seguro",
        text: "Esta a punto de borrar a "+ hospital.nombre,
        icon: "warning",
        type: "warning",//??
        buttons: true,
        dangerMode: true,
      })
      .then ( borrar => {
        console.log(borrar);
        if(borrar){

          this.hospitalService.deleteHospital(hospital)
            .subscribe(  (resp: any) => {
              // this.video = resp.data; //pk delete no me esta devolviendo nada
              console.log('en compomente borrar hospital:', hospital);
              swal("Hospital borrado correctamente","", "success");
              //evitar consumir de nuevo el webservice
              // get index of object with id:37
              var removeIndex = this.hospitales.map(function(item) { return item._id; }).indexOf(hospital._id);
              // remove object
              this.hospitales.splice(removeIndex, 1);
            },
            (error) => {
              console.log('Error en delete ',error);
              swal("error borrando hospital", "error");
            });
        }
      });

  }  

}

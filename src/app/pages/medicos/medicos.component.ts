import { Component, OnInit } from '@angular/core';
import { MedicoService } from '../../services/shared/medico.service';
import { BusquedaService } from '../../services/busqueda.service';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { Medico } from '../../models/medico.model';
//import swal from 'sweetalert';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css']
})
export class MedicosComponent implements OnInit {
  medicos: Medico[];
  total: number;
  registrosPorPagina: number = 3;
  ultimo: number = 0;

  constructor(
    private medicoService: MedicoService,
    private busquedaService: BusquedaService,
    public modalUploadService: ModalUploadService
  ) {}


  ngOnInit() {
    this.getAllMedicos(0,this.registrosPorPagina);

    //me subscribo de forma que si se cambia la imagen de un medico automaticamente reload
    this.modalUploadService.notificacion
    .subscribe ( resp => {
      this.getAllMedicos(0,this.registrosPorPagina);
    });

  }

  mostrarModalCambioImg(id){
    this.modalUploadService.mostrarModal("medicos",id);
  }

  getAllMedicos(offset:number = 0,limit: number = 5) {
    this.medicoService.getMedicos(offset,limit).subscribe((resp: any) => {
      console.log("medicos obtenidos", resp);
      this.medicos = resp.medicos;
      this.total = resp.total;
      console.log("ultimo = ", this.ultimo);
      console.log("medicos",this.medicos);
    });
  }

  /**
   * Busco por dicha cadena en cada evento on input del input de busqueda
   * @param cadena 
   */
  buscar(cadena: string) {
    console.log("buscando", cadena);
    if (cadena === "") {
      this.getAllMedicos(0,this.registrosPorPagina);
    } else {
      this.busquedaService
        .buscarElemento(cadena, "medicos")
        .subscribe((resp: any) => {
          this.medicos = resp.medicos;
          this.total = resp.total;
        });
    }
  }

  siguiente(){
    this.ultimo = this.ultimo += this.registrosPorPagina;
    this.getAllMedicos(this.ultimo,this.registrosPorPagina);
  }

  anterior(){
    this.ultimo = this.ultimo-this.registrosPorPagina
    this.getAllMedicos(this.ultimo,this.registrosPorPagina);
  }

  cambioItemsPerPage(registrosPagina: number){
    this.ultimo = 0;
    this.registrosPorPagina = registrosPagina;
    this.getAllMedicos(this.ultimo,this.registrosPorPagina);
  }


  actualizarMedico(medico: Medico){
    this.medicoService.updateMedico(medico)
    .subscribe(  (resp: any) => {
      // this.video = resp.data; //pk delete no me esta devolviendo nada
      console.log('en compomente actu medico:', medico);
      //Swal("Medico actualizado correctamente","", "success");
      Swal.fire({
        icon: 'success',
        title: name,
        text: 'Medico actualizo correctamente'
      });
    },
    (error) => {
      console.log('Error en update ',error);
      //swal("error actualizando medico", "error");
      Swal.fire({
        icon: 'error',
        title: "error actualizando medico",
        text: "error actualizando medico"
      });
    });
  }


  crearMedico(){
 
  }


  borrarMedico( medico: Medico){

      //confirmamos
     /* swal( {
        title: "¿esta seguro",
        text: "Esta a punto de borrar a "+ medico.nombre,
        icon: "warning",
        type: "warning",
        buttons: true,
        dangerMode: true,
      })*/
      Swal.fire({
        title: "esta seguro?",
        text: "Esta a punto de borrar a "+ medico.nombre,
        icon: 'question',
        showCancelButton: true,
        showConfirmButton: true
      })
      .then ( borrar => {
        console.log(borrar);
        if(borrar){

          this.medicoService.deleteMedico(medico)
            .subscribe(  (resp: any) => {
              // this.video = resp.data; //pk delete no me esta devolviendo nada
              console.log('en compomente borrar medico:', medico);
              Swal.fire({
                icon: 'success',
                title: name,
                text: 'Medico borrado correctamente'
              });
              //evitar consumir de nuevo el webservice
              // get index of object with id:37
              var removeIndex = this.medicos.map(function(item) { return item._id; }).indexOf(medico._id);
              // remove object
              this.medicos.splice(removeIndex, 1);
            },
            (error) => {
              console.log('Error en delete ',error);
              Swal.fire({
                icon: 'error',
                title: "error borrando medico",
                text: "error borrando medico"
              });
            });
        }
      });

  }  

}

import { Component, OnInit } from '@angular/core';
import { MedicoService } from '../../services/shared/medico.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Medico } from '../../models/medico.model';
import swal from 'sweetalert';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/hospital/hospital.service';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css']
})
export class MedicoComponent implements OnInit {

  medico: Medico = new Medico();
  hospitales: Hospital[];
  hospital: Hospital = new Hospital();

  constructor(
    private activatedRoute: ActivatedRoute,
    private medicoService: MedicoService,
    private hospitalService: HospitalService,
    private modalUploadService: ModalUploadService,
    private router: Router) {

      console.log('consumo el webservice en editar');

      this.activatedRoute.params.subscribe( params => {
        console.log(params['id']);
        let id = params['id'];
        if(id === 'nuevo'){
          console.log("es un medico nuevo");
          this.medico.hospital="";
        }
        else {
          console.log("voy a obtener medico con id=",id);
          this.getMedico(id);
        }  
      });
    }

    ngOnInit(){
      this.hospitalService.getHospitales()
      .subscribe( (resp: any) => {
          this.hospitales = resp.hospitales;
      });

      //me subscribo de forma que si se cambia la imagen de un medico automaticamente reload
      this.modalUploadService.notificacion
      .subscribe ( resp => {
        this.getMedico(this.medico._id);
      });
    }

    /**
     * Cambiar imagen medico
     * @param id 
     */
    modalCambiarImg(id){
      this.modalUploadService.mostrarModal("medicos",id);
    }

    getMedico(id: string) {
      this.medicoService.getMedico(id)
        .subscribe(  (resp: any) => {
          console.log("get medico",resp);
          this.medico = resp.medico;
          console.log('en compomente medico:',this.medico);
          //obtengo el hospital
          this.hospital = resp.medico.hospital;
          //seteo el id de hospital para este medico
          // ya que no tiene el objeto completo
          this.medico.hospital = resp.medico.hospital._id;
          console.log("hospital1 = ",this.hospital);
          /*this.hospitalService.getHospital(this.medico.hospital)
          .subscribe( (resp:any) => {
              this.hospital = resp.hospital;
              console.log("hospital2", this.hospital);
          });*/
          


        },
        (error) => {
          console.log('Error en edit medico ', error);
          swal("Error obteniendo medico","error");
        });
    }

    cambioHospital(event){
      console.log(event.target.selectedOptions[0].value);
      let id = event.target.selectedOptions[0].value;
      if(id){
        //obtengo el hospital
        this.hospitalService.getHospital(id)
        .subscribe( (resp:any) => {
            this.hospital = resp.hospital;
        });
      }
      else {
        this.hospital = new Hospital();
      }  
    }

    actualizarMedico(){
      if(this.medico._id){ ///es un update
        this.medicoService.updateMedico(this.medico)
        .subscribe( resp => {
          swal("Medico actualizado correctamente","Medico actualizado correctamente","success");
        });
      }
      else { //es una creacion nueva
        this.medicoService.crearMedico(this.medico)
        .subscribe( resp => {
          // lo que hace es que cuando se crea el medico automaticamnte lo
          // redirige a la edicion para añadirle la foto
          swal("Medico creado correctamente","Medico creado correctamente","success");
          this.router.navigateByUrl(`/medico/${resp.medico._id}`);
        });
      }

    }

}

import { Component, OnInit } from "@angular/core";
import { UsuarioService } from "../../services/usuario/usuario.service";
import { Usuario } from "../../models/usuario.model";
import { BusquedaService } from "../../services/busqueda.service";
import swal from 'sweetalert';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';


//declare var swal: any;

@Component({
  selector: "app-usuarios",
  templateUrl: "./usuarios.component.html",
  styleUrls: ["./usuarios.component.css"]
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[];
  total: number;
  registrosPorPagina: number = 3;
  ultimo: number = 0;

  constructor(
    private usuarioService: UsuarioService,
    private busquedaService: BusquedaService,
    public modalUploadService: ModalUploadService
  ) {}


  ngOnInit() {
    this.getAllUsuarios(0,this.registrosPorPagina);

    //me subscribo de forma que si se cambia la imagen de un usuario automaticamente reload
    this.modalUploadService.notificacion
    .subscribe ( resp => {
      this.getAllUsuarios(0,this.registrosPorPagina);
    });

  }

  mostrarModalCambioImg(id){
    this.modalUploadService.mostrarModal("usuarios",id);
  }

  getAllUsuarios(offset:number = 0,limit: number = 5) {
    this.usuarioService.getUsuarios(offset,limit).subscribe((resp: any) => {
      console.log("usuarios obtenidos", resp);
      this.usuarios = resp.usuarios;
      this.total = resp.total;
      console.log("ultimo = ", this.ultimo);
    });
  }

  /**
   * Busco por dicha cadena en cada evento on input del input de busqueda
   * @param cadena 
   */
  buscar(cadena: string) {
    console.log("buscando", cadena);
    if (cadena === "") {
      this.getAllUsuarios(0,this.registrosPorPagina);
    } else {
      this.busquedaService
        .buscarElemento(cadena, "usuarios")
        .subscribe((resp: any) => {
          this.usuarios = resp.usuarios;
          this.total = resp.total;
        });
    }
  }

  siguiente(){
    this.ultimo = this.ultimo += this.registrosPorPagina;
    this.getAllUsuarios(this.ultimo,this.registrosPorPagina);
  }

  anterior(){
    this.ultimo = this.ultimo-this.registrosPorPagina
    this.getAllUsuarios(this.ultimo,this.registrosPorPagina);
  }

  cambioItemsPerPage(registrosPagina: number){
    this.ultimo = 0;
    this.registrosPorPagina = registrosPagina;
    this.getAllUsuarios(this.ultimo,this.registrosPorPagina);
  }


  actualizarUsuario(usuario: Usuario){
    this.usuarioService.updateUsuario(usuario)
    .subscribe(  (resp: any) => {
      // this.video = resp.data; //pk delete no me esta devolviendo nada
      console.log('en compomente actu usuario:', usuario);
      swal("Usuario actualizado correctamente","", "success");
    },
    (error) => {
      console.log('Error en update ',error);
      swal("error actualizando usuario", "error");
    });
  }

  borrarUsuario( usuario: Usuario){
    if(usuario._id === this.usuarioService.usuario._id) {
      swal("no se puede borrar a si mismo", "error");
    }
    else {
      //confirmamos
      swal( {
        title: "¿esta seguro",
        text: "Esta a punto de borrar a "+ usuario.nombre,
        icon: "warning",
        type: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then ( borrar => {
        console.log(borrar);
        if(borrar){

          this.usuarioService.deleteUsuario(usuario)
            .subscribe(  (resp: any) => {
              // this.video = resp.data; //pk delete no me esta devolviendo nada
              console.log('en compomente borrar usuario:', usuario);
              swal("Usuario borrado correctamente","", "success");
              //evitar consumir de nuevo el webservice
              // get index of object with id:37
              var removeIndex = this.usuarios.map(function(item) { return item._id; }).indexOf(usuario._id);
              // remove object
              this.usuarios.splice(removeIndex, 1);
            },
            (error) => {
              console.log('Error en delete ',error);
              swal("error borrando usuario", "error");
            });
        }
      });

    }
  }  

}

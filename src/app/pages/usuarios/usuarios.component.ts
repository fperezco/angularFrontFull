import { Component, OnInit } from "@angular/core";
import { UsuarioService } from "../../services/usuario/usuario.service";
import { Usuario } from "../../models/usuario.model";
import { BusquedaService } from "../../services/busqueda.service";

@Component({
  selector: "app-usuarios",
  templateUrl: "./usuarios.component.html",
  styleUrls: ["./usuarios.component.css"]
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[];
  constructor(
    private usuarioService: UsuarioService,
    private busquedaService: BusquedaService
  ) {}

  ngOnInit() {
    this.getAllUsuarios();
  }

  getAllUsuarios() {
    this.usuarioService.getUsuarios().subscribe((resp: any) => {
      console.log("usuarios obtenidos", resp);
      this.usuarios = resp.usuarios;
    });
  }

  /**
   * Busco por dicha cadena en cada evento on input del input de busqueda
   * @param cadena 
   */
  buscar(cadena: string) {
    console.log("buscando", cadena);
    if (cadena === "") {
      this.getAllUsuarios();
    } else {
      this.busquedaService
        .buscarElemento(cadena, "usuarios")
        .subscribe((resp: any) => {
          this.usuarios = resp.usuarios;
        });
    }
  }
}

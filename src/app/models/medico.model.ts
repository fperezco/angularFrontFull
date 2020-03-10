import { Usuario } from './usuario.model';
import { Hospital } from './hospital.model';

export class Medico{
    constructor(
        public nombre?: string,
        public usuario?: string,
        public hospital?: string,
        public img?: string, //si uno es opcional, lo de abajo tb por fuerza
        public _id?: string,
    ){}
}
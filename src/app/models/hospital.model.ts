import { Usuario } from './usuario.model';

export class Hospital{
    constructor(
        public nombre?: string,
        public usuario?: Usuario,
        public img?: string, //si uno es opcional, lo de abajo tb por fuerza
        public _id?: string,
    ){}
}
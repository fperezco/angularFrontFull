export class Usuario{
    constructor(
        public nombre: string,
        public email: string,
        public password: string,
        public img?: string, //si uno es opcional, lo de abajo tb por fuerza
        public role?: string,
        public google?: boolean,
        public _id?: string,
    ){}
}
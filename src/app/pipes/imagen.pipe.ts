import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {
  transform(img: string, tipo: string = 'usuario'): any {
    let baseUrl = URL_SERVICIOS + '/imagenes';

    if (!img) {
      return baseUrl + '/usuarios/fake'; // backend devolvera una foto empty
    }
    if (img.indexOf('https') >= 0) {
      // si es imagen de gogle
      return img;
    }

    // en este punto vemos el tipo
    switch (tipo) {
      case 'usuario':
        baseUrl += '/usuarios/' + img;
        break;
      case 'medicos':
        baseUrl += '/medicos/' + img;
        break;
      case 'hospital':
        baseUrl += '/hospital/' + img;
        break;
      default:
        console.log('tipo para obtener imagen no existe');
        baseUrl += '/usuarios/fake';
    }

    console.log("la imagen es ",baseUrl);
    return baseUrl;
  }
}

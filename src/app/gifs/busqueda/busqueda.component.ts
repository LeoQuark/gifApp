import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent {

  // buscara el elemento txt buscar del html para manipular su valor
  // con ! obligo a ts que txtbuscar esa inicializado -- not null assertion operator
  // elementRef es de tipo any, lo obligo con <> a que sea un elemento html input
  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>

  constructor(private gifsService: GifsService) {

  }

  buscar(termino: string): void {

    const valor = this.txtBuscar.nativeElement.value
    // console.log(valor)

    if (valor.trim().length === 0) {
      return;
    }

    // mando el valor obtenido del input al servicio buscar de gifsService
    this.gifsService.buscarGifs(valor)

    this.txtBuscar.nativeElement.value = ''
  }

}

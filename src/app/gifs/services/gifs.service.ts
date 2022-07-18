import { Injectable } from '@angular/core';

// root -- angular lo eleva a un nivel global
@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial: string[] = []

  get historial() {
    return [...this._historial]
  }

  buscarGifs(query: string) {

    query = query.trim().toLocaleLowerCase()

    // agrego la busqueda o query al inicio del historial
    // excluyo los datos repetidos
    if (!this._historial.includes(query)) {
      this._historial.unshift(query)
      this._historial = this._historial.splice(0, 10)
    }

    console.log(this._historial)
  }
}

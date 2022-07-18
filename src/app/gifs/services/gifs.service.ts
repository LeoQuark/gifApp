import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

// root -- angular lo eleva a un nivel global
@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = "SQKAlq6Z1pKRaYGWJ4tK7kAvixqjeJn0"
  private servicioURL: string = 'https://api.giphy.com/v1/gifs'
  private _historial: string[] = []


  public resultados: Gif[] = []

  get historial() {
    return [...this._historial]
  }

  // inicializo el http para hacer peticiones con el modulo de angular
  // se ejecuta sola una vez, se cargan los datos del local storage
  constructor(private http: HttpClient) {

    //obligo a que el item obtenido sea reconocido con !
    this._historial = JSON.parse(localStorage.getItem("historial")!) || []
    this.resultados = JSON.parse(localStorage.getItem("resultados")!) || []
  }

  buscarGifs(query: string) {

    query = query.trim().toLocaleLowerCase()

    // agrego la busqueda o query al inicio del historial
    // excluyo los datos repetidos
    if (!this._historial.includes(query)) {
      this._historial.unshift(query)
      this._historial = this._historial.splice(0, 10)

      // guardo el historial en localstorage como un string
      localStorage.setItem("historial", JSON.stringify(this._historial))
    }

    const params = new HttpParams()
      .set('apikey', this.apiKey)
      .set('limit', '12')
      .set('q', query);

    // suscribe es como un then o await
    this.http.get<SearchGifsResponse>(`${this.servicioURL}/search`, { params })
      .subscribe((response) => {
        // console.log(response.data)
        this.resultados = response.data
        localStorage.setItem("resultados", JSON.stringify(this.resultados))
      })
  }
}

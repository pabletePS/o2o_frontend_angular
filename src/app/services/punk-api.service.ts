import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators'
import { environment } from '../../environments/environment';
import { BeerResponseView, BeersResponse } from '../models/beers-response.model';

@Injectable({
  providedIn: 'root'
})
export class PunkApiService {

  constructor( private _http: HttpClient ) { }

  /** Servicio que obtiene en función de la comida introducida, un listado de cervezas **/
  getBeersWithFoodParam( food:string ): Observable<BeerResponseView[]> {
    //Si no introduce nada, devolvemos el observable con la lista vacía
    if (!food) {
      return of([]);
    }

    //Invocamos al API Punk formateando la salida  
    return this._http.get<BeersResponse[]>(`${environment.urlPunkAPI}?food=${food}`).pipe(
      map( beers => {
        let beersAux: BeerResponseView[] = [];

        beers.map( beer => {
          beersAux.push({id: beer.id, name: beer.name, image_url: beer.image_url});
        });

        return beersAux;
      })
    );
  }
}

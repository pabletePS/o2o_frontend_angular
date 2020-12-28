import { Component } from '@angular/core';
import { BeerResponseView } from 'src/app/models/beers-response.model';
import { PunkApiService } from 'src/app/services/punk-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  /* Variable encargada de almacenar el listado de cervezas en función del término de búsqueda */
  beers: BeerResponseView[] = [];

  /* Término de búsqueda introducido por el usuario */
  searchText: string = '';

  /* Variable para controlar el loading del componente */
  loading: boolean = false;

  constructor( private _punkApiService: PunkApiService ) {
    //Invocamos a la funcion que llama a la capa de servicios de punk API
    this._getBeers();
  }

  /**
   * Función privada que invoca a la capa de servicios de API Punk
   * @param searchText Término de búsqueda (opcional)
   */
  private _getBeers( searchText?: string ) {
    this.loading = true;

    this._punkApiService.getBeersWithFoodParam(searchText).subscribe(
      beersResponse => {
        this.beers = beersResponse;
      },
      error => console.error('Ocurrió un error en el servidor', error),
      () => this.loading = false
    );
  }

  /**
   * Función que se invoca una vez el componente hijo introduce un valor y lo emite al padre
   * @param eventText Valor recibido del componente
   */
  onChangeFoodValue(eventText: string) {
    this._getBeers(eventText);
  }
}
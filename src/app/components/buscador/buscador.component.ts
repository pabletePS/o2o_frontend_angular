import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { BeerResponseView } from 'src/app/models/beers-response.model';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnDestroy {
  /* Binding de entrada de los elementos a pintar en el componente */
  @Input() items: BeerResponseView[] = [];

  /* Campo de entrada para controlar el loading */
  @Input() loading: boolean = false;

  /* Evento de salida al componente padre: Texto introducido */
  @Output() searchTextEvent = new EventEmitter<string>();

  /* Control del modelo searchText */
  modelChanged = new Subject<string>();

  /* Término de búsqueda introducido por el usuario*/
  searchText: string = '';

  constructor() {
    //Controlamos un debounce de 500 ms para no hacer llamadas al API por cada tecla realizada
    this.modelChanged.pipe(debounceTime(500)).subscribe( () => {
      //Mandamos el valor del input al padre
      this.loading = false;
      this.searchTextEvent.emit(this.searchText);  
    });
  }

  /**
   * Función para lanzar el evento al componente padre con el valor actualizado
   */
  onChangeValue() {
    this.loading = true;
    this.modelChanged.next();  
  }

  /**
   * Funcion que elimina el campo introducido en el input
   */
  cleanData() {
    this.loading = false;
    this.items = [];
    this.searchText = '';
  }

  /**
   * Ciclo de vida del componente Angular. Eliminamos la subscripción al cambio de modelo
   */
  ngOnDestroy(): void {
    this.modelChanged.unsubscribe();
  }
}
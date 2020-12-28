import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { BuscadorComponent } from './buscador/buscador.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [NavBarComponent, BuscadorComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [NavBarComponent, BuscadorComponent]
})
export class ComponentsModule { }

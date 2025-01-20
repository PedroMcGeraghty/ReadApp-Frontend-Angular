import { Component } from '@angular/core';

@Component({
  selector: 'app-volver-atras',
  standalone: true,
  imports: [],
  templateUrl: './volver-atras.component.html',
  styleUrl: './volver-atras.component.css'
})
export class VolverAtrasComponent {


  paginaAnterior() {
    window.history.back();
  }
}

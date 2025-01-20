import { Component} from '@angular/core';
import { NgStyle } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-encabezado',
  standalone: true,
  imports: [NgStyle, RouterLink],
  templateUrl: './encabezado.component.html',
  styleUrl: './encabezado.component.css',
})
export class EncabezadoComponent {
  constructor(private rt:Router){

  }
  goTo(option: string) {
    this.rt.navigate([option])
  }
}

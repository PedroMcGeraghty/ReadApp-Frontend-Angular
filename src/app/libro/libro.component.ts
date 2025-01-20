import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Book } from '../../domain/book';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-libro',
  standalone: true,
  imports: [NgIf],
  templateUrl: './libro.component.html',
  styleUrl: './libro.component.css'
})

export class LibroComponent {
  @Input() book!: Book;
  @Input() puedeAgregar: boolean = false
  @Output() enviarLibro = new EventEmitter<string>();


  constructor(private router: Router) {
  }

  ocultarBorrar(): boolean {
    const excludedRoutes = [
      '/search-books',
      '/my-profile/add-books/to-read',
      '/my-profile/add-books/readed',
      '/view-recommendation/detalle'
    ];

    const rutaBase = this.router.url.split('?')[0].replace(/\/\d+$/, ''); // remuevo params del path

    return !excludedRoutes.includes(rutaBase);
  }

  ocultarAgregar(): boolean {
    // hago un map con las rutas / valor y comparo con el parametro que recibo
    const excludedRoutes = [
      '/my-profile/add-books/readed',
      '/my-profile/add-books/to-read'];

    return excludedRoutes.includes(this.router.url);
  }

  agregar() {
    this.enviarLibro.emit(this.book.id.toString())// deberia andar
    console.log(this.book.id)
  }

}

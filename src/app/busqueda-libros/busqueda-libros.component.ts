import { Component } from '@angular/core';
import { BookService } from '../../service/book.service';
import { Book } from '../../domain/book';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../shared/header/header.component';
import { NavComponent } from '../nav/nav.component';
import { LibroComponent } from '../libro/libro.component';
import { ContainerBooksComponent } from '../shared/layouts/books/books.component';
import { ToastService } from '../../service/toast.service';

@Component({
  selector: 'app-busqueda-libros',
  standalone: true,
  imports: [HeaderComponent, LibroComponent, NavComponent, CommonModule, ContainerBooksComponent],
  templateUrl: './busqueda-libros.component.html',
  styleUrls: ['./busqueda-libros.component.css']
})
export class BusquedaLibrosComponent {
  books: Book[] = [];
  filtro: string = ""

  constructor(
    public bookService: BookService,
    public toastr: ToastService) { }

  async ngOnInit() {
    try {
      this.books = await this.bookService.obtenerLibros();
    } catch (error: any) {
      this.toastr.showToast(error.error.message, "error");
    }
  }

  async addFilter(newFilter: string) {
    try {
      this.filtro = newFilter;
      this.books = await this.bookService.obtenerLibrosFiltrados(this.filtro);
    } catch (error: any) {
      this.toastr.showToast(error.error.message, "error");

    }
  }

}



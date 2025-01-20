import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { LibroComponent } from '../libro/libro.component';
import { BookService } from '../../service/book.service';
import { Book } from '../../domain/book';
import { NgFor} from '@angular/common';
import { BotonAgregarComponent } from '../shared/boton-agregar/boton-agregar.component';
import { BtnGuardarCancelarComponent } from '../shared/btn-guardar-cancelar/btn-guardar-cancelar.component';
import { UserBasic } from '../../domain/tmpUser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../../service/toast.service';

@Component({
  selector: 'app-profile-books-readed',
  standalone: true,
  imports: [LibroComponent, NgFor, BotonAgregarComponent, BtnGuardarCancelarComponent],
  templateUrl: './profile-books-readed.component.html',
  styleUrl: './profile-books-readed.component.css'
})
export class ProfileBooksReadedComponent implements OnInit {
  @HostBinding('style.width') width: string = '100%';
  constructor(
    public bookService: BookService,
    public route: Router,
    private router: ActivatedRoute,
    public toastr: ToastService) { }

  books: Book[] = [];
  tipoContenido: string = '';
  estado: boolean = false;
  id: number = 0;
  librosAgregados: number[] = [];
  @Input() user!: UserBasic;

  async ngOnInit(): Promise<void> {
    this.queRenderizo();
    await this.mostrarLibros();
  }

  async mostrarLibros() {
    try {

      this.estado = this.tipoContenido === 'readed';
      this.books = this.estado
        ? await this.bookService.obtenerLibrosPorEstado(true)
        : await this.bookService.obtenerLibrosPorEstado(false);
    } catch (error: any) {
      this.books = [];
      this.toastr.showToast(error.error.message + `en boks ${this.tipoContenido}`, "error");
    }
  }

  async eliminarLibros() {
    try {
      await this.bookService.eliminarLibro(this.librosAgregados, this.estado);
      this.mostrarLibros();
      if (this.books.length > 0) {
        this.toastr.showToast('Modificacion exitosa', "success");
      }
    } catch (error: any) {
      this.books = [];
      this.toastr.showToast('No se pudo eliminar los libros', "error");
    }
  }

  queRenderizo() {
    this.router.params.subscribe(params => {
      this.tipoContenido = params['tipo'];
      this.mostrarLibros(); // llamo a la funcion para que me muestre los libros segun el tipo de contenido
    });
  }

  sacalodelaVista(libro: string) {
    var id = Number(libro)
    this.librosAgregados.push(id)
    console.log(this.librosAgregados)
    this.books = this.books.filter(book => book.id !== id);
    if (this.books.length === 0) {
      this.toastr.showToast('No hay mas libros para mostrar', "info");
    }
  }

  volverHome() {
    this.route.navigate(['home']);
  }
}

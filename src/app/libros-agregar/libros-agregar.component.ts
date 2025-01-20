import { Component, HostBinding, OnInit } from '@angular/core';
import { LibroComponent } from '../libro/libro.component';
import { CommonModule } from '@angular/common';
import { Book } from '../../domain/book';
import { BookService } from '../../service/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { VolverAtrasComponent } from '../volver-atras/volver-atras.component';
import { BtnGuardarCancelarComponent } from '../shared/btn-guardar-cancelar/btn-guardar-cancelar.component';
import { ToastService } from '../../service/toast.service';

@Component({
  selector: 'app-libros-agregar',
  standalone: true,
  imports: [LibroComponent, CommonModule, VolverAtrasComponent, BtnGuardarCancelarComponent],
  templateUrl: './libros-agregar.component.html',
  styleUrls: ['./libros-agregar.component.css']
})
export class LibrosAgregarComponent implements OnInit {

  @HostBinding('style.width') width: string = '100%';
  tipoContenido!: string;
  estado!: boolean;

  books: Book[] = []; // Inicializa como un arreglo vacío
  librosAgregados: number[] = [];
  id: number = 0;

  constructor(
    private route: ActivatedRoute,
    public bookService: BookService,
    public router: Router,
    public toastr: ToastService
  ) { }

  async ngOnInit(): Promise<void> {
    this.queRenderizo();
    await this.mostrarLibros();
  }

  async mostrarLibros() {
    try {
      this.books = (this.tipoContenido === 'to-read')
        ? await this.bookService.obtenerParaLeer()
        : await this.bookService.obtenerLibrosPorEstado(!this.estado);
    } catch (error: any) {
      this.books = [];

      this.toastr.showToast(error.error.message + `para agregar a libros ${this.tipoContenido}`, "error");
    }
  }

  async agregarLibros() {
    try {
      await this.bookService.agregarLibro(this.librosAgregados, this.estado);
      await this.mostrarLibros(); // Espera a que se complete
      if (this.books.length > 0) {
        this.toastr.showToast('Modificacion exitosa', "success");
      }
      this.router.navigate(['/my-profile/books/', this.tipoContenido]);
    } catch (error: any) {
      this.books = [];
      this.toastr.showToast(error.error.message, "error");
    }
  }

  queRenderizo() {
    this.route.params.subscribe(params => {
      this.tipoContenido = params['tipo'];
      this.estado = (this.tipoContenido === 'readed');
    });
  }

  sacalodelaVista(libro: string) {
    const id = Number(libro);
    this.librosAgregados.push(id);
    this.books = this.books.filter(book => book.id !== id);
    if (this.books.length === 0) {
      this.toastr.showToast('No hay mas libros para mostrar', "info");
    }
  }

  volverHome() {
    this.router.navigate(['home']);
  }
}

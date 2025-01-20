import { Component, Input, input, OnInit } from '@angular/core';
import { ProfileBooksReadedComponent } from "../profile-books-readed/profile-books-readed.component";
import { HeaderComponent } from "../shared/header/header.component";
import { ResenaComponent } from "../resena/resena.component";
import { BotonAgregarComponent } from "../shared/boton-agregar/boton-agregar.component";
import { ValoracionComponent } from '../valoracion/valoracion.component';
import { NgIf, NgFor } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ContainerBooksComponent } from "../shared/layouts/books/books.component";
import { Recommendation } from '../../domain/recommendation';
import { LibroComponent } from "../libro/libro.component";
import { BtnGuardarCancelarComponent } from "../shared/btn-guardar-cancelar/btn-guardar-cancelar.component";
import { RecommendationService } from '../../service/recommendation.service';
import { Book } from '../../domain/book';
import { FormsModule } from '@angular/forms';
import { VolverAtrasComponent } from "../volver-atras/volver-atras.component";
import { BookService } from '../../service/book.service';
import { tr } from 'date-fns/locale';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from '../../service/toast.service';
@Component({
  selector: 'app-view-recommendation',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf, ProfileBooksReadedComponent, HeaderComponent, ResenaComponent, BotonAgregarComponent, ValoracionComponent, ContainerBooksComponent, LibroComponent, BtnGuardarCancelarComponent, VolverAtrasComponent],
  templateUrl: './view-recommendation.component.html',
  styleUrls: ['./view-recommendation.component.css']
})
export class ViewRecommendationComponent implements OnInit {
  constructor(private toast: ToastService, private recommendationService: RecommendationService, private router: Router, private route: ActivatedRoute, public libroService: BookService) { }
  puedeAgregar = true
  recomendacion: Recommendation = new Recommendation()
  puedeEditar: boolean = false
  puedeCrear: boolean = false
  librosQuePuedoAgregar: Book[] = []

  async ngOnInit() {
    this.tipoDePagina()
    this.librosLeidos()
  }

  tipoDePagina() { 
    if(this.esCrear()){
      this.puedeCrear = true
      this.recomendacion = new Recommendation()
      return
    }
    this.puedeEditar = this.esEditable()
    this.traerRecomendacion()
  }

  esEditable = (): boolean => this.route.snapshot.url.length > 1 && this.route.snapshot.url[1].path === 'edit'

  esCrear = (): boolean => this.route.snapshot.url[1].path === 'crear'  
  
  async traerRecomendacion() {
    this.route.params.subscribe(async (viewRecommendationParams) => {
      const recomendacionId = viewRecommendationParams['id'];
      try {
        this.recomendacion = await this.recommendationService.getRecommendationById(recomendacionId);
      } catch (error: any) {
        if (error instanceof HttpErrorResponse) {
          this.toast.showToast(`${error.error['message']}`, 'warning');
          this.router.navigate(['/home']);
        }
        return error;
      }
    });
  }

  async librosLeidos() {
    try {
      const idUser = Number(localStorage.getItem('id'))
      const librosLeidos = await this.libroService.obtenerLibrosPorEstado(true)
      this.librosQuePuedoAgregar = librosLeidos.filter(libro =>
        !this.recomendacion.recommendedBooks.some(recommendedBook => recommendedBook.id === libro.id)
      );
    } catch (error) {
      console.error('Error al obtener los libros:', error)
    }
  }

  sacarLibro(libro: string) {
    var id = Number(libro);
    // Encuentra el índice del libro a eliminar en el array
    const index = this.recomendacion.recommendedBooks.findIndex((libro: Book) => libro.id == id);
    this.recomendacion.recommendedBooks.splice(index, 1);
  }
  agregarLibro(libro: string) {
    var id = Number(libro);
    //  tengo qe buscar ese id en los libros que puedo agregar
    var libroAgregado = this.librosQuePuedoAgregar.find((libro: Book) => libro.id == id);
    this.librosQuePuedoAgregar = this.librosQuePuedoAgregar.filter((libro: Book) => libro.id !== id);
    if (libroAgregado) {
      this.recomendacion.recommendedBooks.push(libroAgregado)
    } else {
      this.toast.showToast(`Libro no encontrado para agregar: ${id}`,"warning")
    }
  }

  async editarRecomendacion() {
    if(this.validacion()){
        this.toast.showToast('complete los campos vacios',"warning")
        return
    }
    try{
      await this.recommendationService.actualizarRecomendacion(this.recomendacion)
      await this.toast.showToast('Recomendacion editada con exito', 'success');
    } catch(error:any){
        if(error instanceof HttpErrorResponse){
          this.toast.showToast(`${error.error['message']}`, 'warning');
          return error
        }
        return error
       }
    this.traerRecomendacion()
    this.librosLeidos()
  }

  async crearRecomendacion() {
    if(this.validacion()){
      this.toast.showToast('complete los campos vacios',"warning")
      return
  }
    await this.recommendationService.createRecommendations(this.recomendacion)
    await this.toast.showToast('Recomendacion creada con exito',"success")
    await this.goTo('/home/myRecommendations/false')

  }

  createOrEdit() {
    if(this.esCrear()){
      this.crearRecomendacion()
      return
    }
    this.editarRecomendacion()
  }

  validacion = (): boolean => (!this.recomendacion.title.trim() || !this.recomendacion.description.trim()) || this.recomendacion.recommendedBooks.length === 0

  cancelar() {
    this.goTo('/home')
  }

  goTo(option: string) {
    this.router.navigate([option])
  }
}

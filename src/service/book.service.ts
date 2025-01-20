import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Book, BookJSON } from '../domain/book';
import { REST_SERVER_URL } from './configuration';
import { lastValueFrom } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CommonForm } from '../domain/forms';
import { id } from 'date-fns/locale';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  libros!: Book;

  filtroCambiado = new EventEmitter<string>();
  libroCambiado = new EventEmitter<Book>();

  constructor(private httpClient: HttpClient, private toastr: ToastrService) { }

  async obtenerLibros(): Promise<Book[]> {
    const libros$ = this.httpClient.get<BookJSON[]>(REST_SERVER_URL + '/librosSearch');
    const bookJSON = await lastValueFrom(libros$);
    return bookJSON.map((libroJSON) => Book.fromJson(libroJSON));

  }

  async obtenerLibrosFiltrados(filtro: string): Promise<Book[]> {
    const libros$ = this.httpClient.get<BookJSON[]>(REST_SERVER_URL + '/librosSearch/filter', {
      params: { filtro: filtro }
    });
    const bookJSON = await lastValueFrom(libros$);
    const libros = bookJSON.map((libroJSON) => Book.fromJson(libroJSON));
    return libros;
  }

  async obtenerLibrosPorEstado(booleano: boolean): Promise<Book[]> {
    const libros$ = this.httpClient.get<BookJSON[]>(REST_SERVER_URL + '/obtenerlibroEstado', {
      params: { estado: booleano }
    });
    const bookJSON = await lastValueFrom(libros$);
    return bookJSON.map((libroJSON) => Book.fromJson(libroJSON));

  }

  async agregarLibro(idLibro: number[], estado: boolean): Promise<void> {
    await lastValueFrom(this.httpClient.put(REST_SERVER_URL + '/agregarLibroEstado',
      { estado, idLibro }
    ));

  }

  async obtenerParaLeer(): Promise<Book[]> {
    const libros$ = this.httpClient.get<BookJSON[]>(REST_SERVER_URL + '/add-Books', {
    });
    const bookJSON = await lastValueFrom(libros$);
    return bookJSON.map((libroJSON) => Book.fromJson(libroJSON));
  }

  async eliminarLibro(idLibro: number[], estado: boolean): Promise<void> {
    await lastValueFrom(this.httpClient.delete(REST_SERVER_URL + '/eliminarLibroEstado', {
      body: { estado, idLibro }
    }));

  }
}
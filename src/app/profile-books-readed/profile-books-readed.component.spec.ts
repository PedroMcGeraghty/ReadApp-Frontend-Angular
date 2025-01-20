import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileBooksReadedComponent } from './profile-books-readed.component';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Para pruebas con HttpClient
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { BookService } from '../../service/book.service';
import { Book } from '../../domain/book';
import { BookJSON } from '../../domain/book';

describe('ProfileBooksReadedComponent', () => {
  let component: ProfileBooksReadedComponent;
  let fixture: ComponentFixture<ProfileBooksReadedComponent>;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let activatedRouteSpy: jasmine.SpyObj<ActivatedRoute>;
  let bookServiceSpy: jasmine.SpyObj<BookService>;
  let routerSpy: jasmine.SpyObj<Router>;

  const mockBooks: BookJSON[] = [
    {
      autor: 'pablito',
      cantidadPalabras: 100,
      cantidadPaginas: 100,
      ventasSemanales: 100,
      traducciones: ['español'],
      titulo: 'el libro de pablito',
      id: 1,
      imagen: 'imagen'
    },
    {
      autor: 'maria',
      cantidadPalabras: 200,
      cantidadPaginas: 150,
      ventasSemanales: 200,
      traducciones: ['ingles'],
      titulo: 'el libro de maria',
      id: 2,
      imagen: 'imagen2'
    }
  ];

  beforeEach(async () => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', ['params']);
    bookServiceSpy = jasmine.createSpyObj('BookService', ['obtenerLibrosPorEstado']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule, // Necesario para simular HttpClient
        ProfileBooksReadedComponent // Mover a imports en lugar de declarations
      ],
      providers: [
        { provide: HttpClient, useValue: httpClientSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
        { provide: BookService, useValue: bookServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileBooksReadedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('printea segun params de url', () => {
    const params = { tipo: 'readed' };
    activatedRouteSpy.params = of(params);
    spyOn(component, 'mostrarLibros');
    component.queRenderizo();
    expect(component.tipoContenido).toBe('readed');
    expect(component.mostrarLibros).toHaveBeenCalled();
  });

  it('se quitan los libros de la lista', () => {
    component.books = mockBooks.map(Book.fromJson);
    component.sacalodelaVista('1'); // Pasar número como entero
    expect(component.books.length).toBe(1);
    expect(component.books[0].id).toBe(2);
  });

  it('ruta volver home', () => {
    component.volverHome();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['home']);
  });

  it('error HttpErrorResponse en mostrarLibros', async () => {
    const errorResponse = new HttpErrorResponse({
      error: { timestamp: 'timestamp', status: 400, error: 'error', message: 'message', path: 'path' },
      status: 400,
      statusText: 'Bad Request'
    });
    bookServiceSpy.obtenerLibrosPorEstado.and.throwError(errorResponse as any); // Simulamos el error
    spyOn(console, 'log');

    await component.mostrarLibros();

    expect(console.log).toHaveBeenCalledWith('timestamp');
    expect(console.log).toHaveBeenCalledWith(400);
    expect(console.log).toHaveBeenCalledWith('error');
    expect(console.log).toHaveBeenCalledWith('message');
    expect(console.log).toHaveBeenCalledWith('path');
  });
});

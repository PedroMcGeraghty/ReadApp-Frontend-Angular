import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BusquedaLibrosComponent } from './busqueda-libros.component';
import { BookService } from '../../service/book.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Book } from '../../domain/book';
import { BookJSON } from '../../domain/book';
import { ToastrModule } from 'ngx-toastr';

describe('BusquedaLibrosComponent', () => {
  let component: BusquedaLibrosComponent;
  let fixture: ComponentFixture<BusquedaLibrosComponent>;
  let httpTestingController: HttpClientTestingModule;
  let bookService: jasmine.SpyObj<BookService>;

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
    await TestBed.configureTestingModule({
      imports: [BusquedaLibrosComponent, HttpClientTestingModule, ToastrModule.forRoot()],  // Importa el módulo de pruebas HTTP
      providers: [
        { provide: BookService, useValue: jasmine.createSpyObj('BookService', ['obtenerLibros', 'obtenerLibrosFiltrados']) }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BusquedaLibrosComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpClientTestingModule);
    bookService = TestBed.inject(BookService) as jasmine.SpyObj<BookService>;

    // Simula la respuesta de `obtenerLibros`
    bookService.obtenerLibros.and.returnValue(Promise.resolve(mockBooks.map(Book.fromJson)));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('me trae libros al inicio', async () => {
    await component.ngOnInit();
    expect(component.books).toEqual(mockBooks.map(Book.fromJson));
  });

  it('debe traer los filtrados', async () => {
    // simulo la respuesta del service me va a dar a pablito
    const filteredBooks: Book[] = [Book.fromJson(mockBooks[0])];
    bookService.obtenerLibrosFiltrados.and.returnValue(Promise.resolve(filteredBooks));

    //  filtro 'pablito'
    await component.addFilter('pablito');

    // verifico que la lista de libros se actualice con el libro filtrado
    expect(component.books).toEqual(filteredBooks);
  });

  it('debe retornar una lista vacía con un filtro que no tenga coincidencias', async () => {
    // Simula un filtro que no devuelve resultados
    const filteredBooks: Book[] = [];  // Ningún libro encontrado

    // Simula la respuesta del servicio `obtenerLibrosFiltrados`
    bookService.obtenerLibrosFiltrados.and.returnValue(Promise.resolve(filteredBooks));

    // Aplica el filtro 'libro que no existe'
    await component.addFilter('libro que no existe');

    // Verifica que la lista de libros esté vacía
    expect(component.books).toEqual(filteredBooks);
  });
});

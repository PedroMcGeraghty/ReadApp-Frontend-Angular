import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibrosAgregarComponent } from './libros-agregar.component';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BookService } from '../../service/book.service';
import { of } from 'rxjs';

describe('LibrosAgregarComponent', () => {
  let component: LibrosAgregarComponent;
  let fixture: ComponentFixture<LibrosAgregarComponent>;
  let activatedRouteSpy: jasmine.SpyObj<ActivatedRoute>;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let bookServiceSpy: jasmine.SpyObj<BookService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    // Inicializar los spies
    activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', ['params']);
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    bookServiceSpy = jasmine.createSpyObj('BookService', ['agregarLibro']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [LibrosAgregarComponent], // Importar el componente en lugar de declararlo
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
        { provide: HttpClient, useValue: httpClientSpy },
        { provide: BookService, useValue: bookServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LibrosAgregarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call agregarLibro and navigate to the correct route', async () => {
    const agregarLibroSpy = bookServiceSpy.agregarLibro.and.returnValue(Promise.resolve());
    const mostrarLibrosSpy = spyOn(component, 'mostrarLibros').and.returnValue(Promise.resolve());
    const navigateSpy = routerSpy.navigate;

    component.id = 1;
    component.librosAgregados = [1, 2, 3];
    component.estado = true;
    component.tipoContenido = 'readed';

    await component.agregarLibros();

    expect(agregarLibroSpy).toHaveBeenCalledWith([1, 2, 3], true);
    expect(mostrarLibrosSpy).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith(['/my-profile/books/', 'readed']);
  });
});

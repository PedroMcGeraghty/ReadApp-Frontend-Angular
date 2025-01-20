import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Recommendation } from "../../domain/recommendation";
import { RecommendationService } from "../../service/recommendation.service";
import { BookService } from "../../service/book.service";
import { ToastService } from "../../service/toast.service";
import { ViewRecommendationComponent } from "./view-recommendation.component";
import { ActivatedRoute, Router } from "@angular/router";
import { of } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { HttpClientModule } from '@angular/common/http';
import { Book } from "../../domain/book";


describe('ViewRecommendationComponent', () => {
  let component: ViewRecommendationComponent;
  let fixture: ComponentFixture<ViewRecommendationComponent>;
  let recommendationServiceMock: jasmine.SpyObj<RecommendationService>;
  let bookServiceMock: jasmine.SpyObj<BookService>;
  let toastServiceMock: jasmine.SpyObj<ToastService>;
  let routerMock: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    recommendationServiceMock = jasmine.createSpyObj('RecommendationService', ['getRecommendationById','actualizarRecomendacion']);
    bookServiceMock = jasmine.createSpyObj('BookService', ['obtenerLibrosPorEstado']);
    toastServiceMock = jasmine.createSpyObj('ToastService', ['showToast']);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);
  });

  const setupTestBed = (isCreateMode: boolean) => {
    return TestBed.configureTestingModule({
      imports: [ViewRecommendationComponent], // Importamos el componente directamente
      providers: [
        { provide: RecommendationService, useValue: recommendationServiceMock },
        { provide: BookService, useValue: bookServiceMock },
        { provide: ToastService, useValue: toastServiceMock },
        { provide: Router, useValue: routerMock },
        { 
          provide: ActivatedRoute, 
          useValue: { 
            params: of({ id: isCreateMode ? null : 1 }),
            snapshot: { 
              url: [{ path: 'view' }, { path: isCreateMode ? 'crear' : 'edit' }] 
            } 
          } 
        },
      ]
    }).compileComponents();
  };

  it('Deberia crear el componente e inicializar las propiedades en modo editar', async () => {
    await setupTestBed(false); // Modo editar

    fixture = TestBed.createComponent(ViewRecommendationComponent);
    component = fixture.componentInstance;

    recommendationServiceMock.getRecommendationById.and.returnValue(Promise.resolve(new Recommendation(
      'Test Author',
      [],
      'Test Title',
      'Test Description',
      true,
      [],
      0,
      1,
      true
    )));

    await component.ngOnInit();

    expect(component).toBeTruthy();
    expect(component.recomendacion.title).toBe('Test Title');
    expect(component.recomendacion.description).toBe('Test Description');
    expect(component.puedeCrear).toBeFalse();
    expect(component.puedeEditar).toBeTrue();
  });

  it('Deberia crear el componente en modo crear', async () => {
    await setupTestBed(true); // Modo crear

    fixture = TestBed.createComponent(ViewRecommendationComponent);
    component = fixture.componentInstance;

    await component.ngOnInit();

    expect(component).toBeTruthy();
    expect(component.puedeCrear).toBeTrue(); // Debe ser true en modo crear
    expect(component.recomendacion).toBeTruthy(); // La recomendación debe estar inicializada
  });

  it('Deberia mostrar un toast y redirigir cuando no se encuentra la recomendación', async () => {
    await setupTestBed(false); // Modo editar

    fixture = TestBed.createComponent(ViewRecommendationComponent);
    component = fixture.componentInstance;

    // Simulamos un error en getRecommendationById
    const errorResponse = new HttpErrorResponse({ error: { message: 'Recomendación no encontrada' }, status: 404 });
    recommendationServiceMock.getRecommendationById.and.returnValue(Promise.reject(errorResponse));

    await component.ngOnInit();

    expect(component).toBeTruthy();
    expect(toastServiceMock.showToast).toHaveBeenCalledWith('Recomendación no encontrada', 'warning');
    expect(routerMock.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('Debería agregar un libro a la recomendación', async () => {
    await setupTestBed(true); // Modo crear
  
    fixture = TestBed.createComponent(ViewRecommendationComponent);
    component = fixture.componentInstance;
  
    // Simulamos la inicialización de libros que se pueden agregar
    const libro1 = new Book(1, 'Libro 1', 'Autor 1');
    const libro2 = new Book(2, 'Libro 2', 'Autor 2');
    component.librosQuePuedoAgregar = [libro1, libro2];
    component.recomendacion = new Recommendation();
  
    // Agregamos un libro
    component.agregarLibro('1'); // Intentamos agregar el libro con ID 1
  
    expect(component.recomendacion.recommendedBooks).toContain(libro1);
    expect(component.librosQuePuedoAgregar).not.toContain(libro1);
    expect(component.librosQuePuedoAgregar).toContain(libro2);
  });

  it('Debería editar la recomendación y mostrar un toast de éxito', async () => {
    await setupTestBed(false); // Modo editar
  
    fixture = TestBed.createComponent(ViewRecommendationComponent);
    component = fixture.componentInstance;
  
    // Simulamos la recomendación a editar
    const libro1 = new Book(1, 'Libro 1', 'Autor 1');

    const mockRecommendation = new Recommendation(
      'Test Author',
      [libro1],
      'Test Title',
      'Test Description',
      true,
      [],
      0,
      1,
      true
    );
  
    component.recomendacion = mockRecommendation;
  
    // Simulamos que la llamada para actualizar la recomendación es exitosa
    recommendationServiceMock.actualizarRecomendacion.and.returnValue(Promise.resolve(mockRecommendation.toJSON()));
  
    await component.editarRecomendacion(); // Llamamos al método a probar
  
    expect(toastServiceMock.showToast).toHaveBeenCalledWith('Recomendacion editada con exito', 'success');
    expect(recommendationServiceMock.actualizarRecomendacion).toHaveBeenCalledWith(mockRecommendation);
  });
  
});

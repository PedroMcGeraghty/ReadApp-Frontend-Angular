import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RecommendationService } from './recommendation.service';
import { ToastService } from './toast.service';
import { Router } from '@angular/router';
import { Recommendation, RecommendationCard } from '../domain/recommendation';
import { REST_SERVER_URL } from './configuration';
import { Valoration } from '../domain/valoration';

describe('RecommendationService', () => {
  let service: RecommendationService;
  let httpMock: HttpTestingController;
  let toastServiceMock: jasmine.SpyObj<ToastService>;
  let routerMock: jasmine.SpyObj<Router>;
  

  beforeEach(() => {
    const toastSpy = jasmine.createSpyObj('ToastService', ['showToast']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        RecommendationService,
        { provide: ToastService, useValue: toastSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });

    service = TestBed.inject(RecommendationService);
    httpMock = TestBed.inject(HttpTestingController);
    toastServiceMock = TestBed.inject(ToastService) as jasmine.SpyObj<ToastService>;
    routerMock = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Deberia crear el Servicio', () => {
    expect(service).toBeTruthy();
  });

  describe('getRecommendations', () => {
    it('Deberia devolver recomendaciones', async () => {
      const mockRecommendations = [
        {
          creador: 'Author',
          librosRecomendados: [],
          titulo: 'Test Recommendation',
          contenido: 'Description here',
          publica: true,
          valoraciones: [],
          valoracionTotal: 0,
          id: 1,
          puedeValorar: true
        }
      ];
  
      const response = service.getRecommendations();
      const req = httpMock.expectOne(`${REST_SERVER_URL}/recommendations`);
      req.flush(mockRecommendations);
  
      await expectAsync(response).toBeResolvedTo(mockRecommendations.map(r => Recommendation.fromJson(r)));
    });
  });

  describe('getRecommendationsFilter', () => {
    it('Debería devolver recomendaciones filtradas', async () => {
      const mockFilteredRecommendations = [
        {
          id: 1,
          title: 'Filtered Recommendation',
          editable: true,
          deletable: true,
          public: true,
          pending: false,
          content: 'Filtered content',
          bookTitles: ['Book 1', 'Book 2'],
          popularity: 10,
          aproxTime: 5
        }
      ];
      const filtro = 'test';

      const response = service.getRecommendationsFilter(filtro);
      httpMock.expectOne(req => req.url.includes('/recommendations/filter') && req.params.has('filtro')).flush(mockFilteredRecommendations);

      await expectAsync(response).toBeResolvedTo(mockFilteredRecommendations.map(r => RecommendationCard.fromJson(r)));
    });
  });

  describe('actualizarRecomendacion', () => {
    it('Debería actualizar una recomendación y devolver la recomendación actualizada', async () => {
        // Crea una recomendación de prueba
        const mockRecommendation = new Recommendation(
            'Author',
            [], // libros recomendados
            'Updated Title',
            'Updated Description',
            true,
            [],
            0,
            1,
            true
        );

        // Define la respuesta simulada de la API
        const updatedMockRecommendation = {
            creador: 'Author',
            librosRecomendados: [],
            titulo: 'Updated Title',
            contenido: 'Updated Description',
            publica: true,
            valoraciones: [],
            valoracionTotal: 0,
            id: 1,
            puedeValorar: true
        };

        // Invoca el método a probar, usando `toJSON()`
        const response = service.actualizarRecomendacion(mockRecommendation);

        // Espera la llamada a la API
        const req = httpMock.expectOne(`${REST_SERVER_URL}/recommendations`);
        expect(req.request.method).toBe('PUT');
        req.flush(updatedMockRecommendation); // Simula la respuesta de la API

        // Verifica que la respuesta sea la recomendación actualizada
        await expectAsync(response).toBeResolvedTo(updatedMockRecommendation);

    });
});
describe('agregarValoracion', () => {
  it('Debería agregar una valoración y devolver la valoración creada', async () => {
    // Crea una valoración de prueba
    const mockValoration = new Valoration(
      'Author',
      'path/to/photo.jpg',
      5,
      new Date(),
      'Great recommendation!'
    );

    // Define la respuesta simulada de la API
    const mockResponse = {
      author: 'Author',
      fotoPath: 'path/to/photo.jpg',
      score: 5,
      fecha: new Date().toISOString(),
      comentario: 'Great recommendation!'
    };

    // Invoca el método a probar
    const response = service.agregarValoracion(mockValoration, 1);

    // Espera la llamada a la API
    const req = httpMock.expectOne(`${REST_SERVER_URL}/recommendations/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockResponse); // Simula la respuesta de la API

    // Verifica que la respuesta sea la valoración creada
    await expectAsync(response).toBeResolvedTo(mockResponse);
  });
});

});

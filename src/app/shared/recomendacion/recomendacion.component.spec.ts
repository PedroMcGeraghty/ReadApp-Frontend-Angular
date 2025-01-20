import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecomendacionComponent } from './recomendacion.component';
import { ActivatedRoute } from '@angular/router';
import { RecommendationCard } from '../../../domain/recommendation';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Importa HttpClientTestingModule

describe('RecomendacionComponent', () => {
  let component: RecomendacionComponent;
  let fixture: ComponentFixture<RecomendacionComponent>;
  let activatedRouteSpy: jasmine.SpyObj<ActivatedRoute>;

  beforeEach(async () => {
    activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', ['snapshot']); // Crea un espía para ActivatedRoute

    await TestBed.configureTestingModule({
      imports: [
        RecomendacionComponent,
        HttpClientTestingModule // Agrega el módulo de pruebas para HttpClient
      ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecomendacionComponent);
    component = fixture.componentInstance;
    
    // Inicializa la recomendación antes de detectar cambios
    component.recomendacion = new RecommendationCard();
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

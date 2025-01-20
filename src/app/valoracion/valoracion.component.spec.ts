import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ValoracionComponent } from './valoracion.component'
import { RecommendationService } from '../../service/recommendation.service'
import { ToastrService } from 'ngx-toastr'
import { NO_ERRORS_SCHEMA } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http' // Importa HttpClientModule
import { ToastService } from '../../service/toast.service'

describe('ValoracionComponent', () => {
  let component: ValoracionComponent
  let fixture: ComponentFixture<ValoracionComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule, 
        HttpClientModule, 
        ValoracionComponent
      ],
      providers: [
        { provide: RecommendationService, useValue: {} }, // Mock del servicio
        { provide: ToastrService, useValue: {} } // Mock del toastr
      ],
      schemas: [NO_ERRORS_SCHEMA] // Ignorar errores de componentes no declarados
    }).compileComponents()

    fixture = TestBed.createComponent(ValoracionComponent)
    component = fixture.componentInstance
  })

  it('debería crear el componente', () => {
    expect(component).toBeTruthy()
  })

  it('debería establecer la calificación correctamente al llamar a setRating', () => {
    component.setRating(4)
    expect(component.rating).toBe(4)
  })

  it('debería agregar la valoración correctamente y reiniciar el estado', async () => {
    // Simula la entrada del usuario
    component.nuevaValoracion.comentario = 'Buen libro'
    component.rating = 5
  
    // Simula que el servicio devuelve una promesa resuelta
    const recommendationService = TestBed.inject(RecommendationService)
    recommendationService.agregarValoracion = jasmine.createSpy('agregarValoracion').and.returnValue(Promise.resolve())
  
    await component.agregarLaValoracion()
  
    expect(recommendationService.agregarValoracion).toHaveBeenCalledWith(component.nuevaValoracion, component.id)
    expect(component.nuevaValoracion.comentario).toBe('')
    expect(component.rating).toBe(0)
  })

  it('no debería agregar la valoración si la validación falla', async () => {
    component.nuevaValoracion.comentario = '';
    component.rating = 0;
    const recommendationService = TestBed.inject(RecommendationService)
    recommendationService.agregarValoracion = jasmine.createSpy('agregarValoracion').and.returnValue(Promise.resolve())

    await component.agregarLaValoracion();

    expect(recommendationService.agregarValoracion).not.toHaveBeenCalled();
    //expect(ToastService.showToast).toHaveBeenCalledWith("Por favor complete los campos vacios", "warning");
  });
})

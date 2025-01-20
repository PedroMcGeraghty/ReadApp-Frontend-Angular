import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ValoracionIndividualComponent } from './valoracion-individual.component';
import { Valoration } from '../../domain/valoration';

describe('ValoracionIndividualComponent', () => {
  let component: ValoracionIndividualComponent;
  let fixture: ComponentFixture<ValoracionIndividualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValoracionIndividualComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValoracionIndividualComponent);
    component = fixture.componentInstance;

    // Asegúrate de que el constructor de Valoration acepte estos parámetros
    component.valoracion = new Valoration(
      'path/to/photo.jpg',
      'Autor de la valoración',
      5,
      new Date(),
      'Comentario de ejemplo'
    );

    fixture.detectChanges(); // Detecta cambios después de la inicialización
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

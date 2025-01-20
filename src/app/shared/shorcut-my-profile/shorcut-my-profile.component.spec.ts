import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShorcutMyProfileComponent } from './shorcut-my-profile.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ServiceUser } from '../../../service/service-user.service';
import { UserBasic } from '../../../domain/tmpUser';

describe('ShorcutMyProfileComponent', () => {
  let component: ShorcutMyProfileComponent;
  let fixture: ComponentFixture<ShorcutMyProfileComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ShorcutMyProfileComponent,
        HttpClientTestingModule,
        RouterTestingModule // Para simular el enrutador
      ],
      providers: [
        {
          provide: ServiceUser,
          useValue: jasmine.createSpyObj('ServiceUser', ['getUser']) // Simula el servicio
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ShorcutMyProfileComponent);
    component = fixture.componentInstance;

    // Inicializa los inputs
    component.user = new UserBasic();
    component.user.fotoPath = 'path/to/photo.jpg'; // Si tienes la propiedad fotoPath
    component.show = true; // Establece un valor para show

    fixture.detectChanges(); // Detecta cambios para inicializar el componente

    // Inyecta el Router para espiar su método navigate
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería alternar displayShorcut cuando se llame a changeDisplay', () => {
    expect(component.displayShorcut).toBeFalse(); // Inicialmente debería ser false
    component.changeDisplay(); // Cambia el estado
    expect(component.displayShorcut).toBeTrue(); // Ahora debería ser true
    component.changeDisplay(); // Cambia de nuevo
    expect(component.displayShorcut).toBeFalse(); // Debería volver a ser false
  });

  it('debería navegar al camino correcto al llamar a goTo', () => {
    spyOn(router, 'navigate'); // Espía el método navigate

    const optionPath = 'my-profile';
    component.goTo(optionPath); // Llama a goTo

    expect(router.navigate).toHaveBeenCalledWith([optionPath]); // Verifica que se navegue al camino correcto
  });
});

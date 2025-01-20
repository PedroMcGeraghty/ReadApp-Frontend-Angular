import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AmigosComponent } from './amigos.component';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router'; // Importar RouterModule
import { By } from '@angular/platform-browser';
import { UserFriend, UserFriendJSON, UserProfile, UserProfileJSON } from '../../domain/tmpUser';

describe('AmigosComponent', () => {
  let component: AmigosComponent;
  let fixture: ComponentFixture<AmigosComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AmigosComponent, RouterModule.forRoot([])], // Usar RouterModule.forRoot
    }).compileComponents();

    fixture = TestBed.createComponent(AmigosComponent);
    component = fixture.componentInstance;

    // Configurar el router espía
    router = TestBed.inject(Router);
    spyOn(router, 'getCurrentNavigation').and.returnValue(null); // O simula según sea necesario

    // Seteamos el @Input con un valor válido
    component.userFriend = {
      id: 1, nombreCompleto: 'Amigo 1',
      fotoPath: '',
      username: '',
      fromJSON: function (userFriendJSON: UserFriendJSON): UserFriend {
        throw new Error('Function not implemented.');
      },
      toJSON: function (user: UserProfile): UserProfileJSON {
        throw new Error('Function not implemented.');
      }
    };

    fixture.detectChanges(); // Detectar cambios iniciales
  });

  it('debe emitir el evento enviarAmigo con el ID del amigo al hacer clic en el botón', () => {
    spyOn(component.enviarAmigo, 'emit'); // Espiar la emisión del evento

    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click', null); // Simular clic

    expect(component.enviarAmigo.emit).toHaveBeenCalledWith('1'); // Verificar que emitió con el ID
  });

  it('ocultarBorrar() debe devolver true si la ruta es "/my-profile/friends"', () => {
    // Simular la ruta actual
    spyOnProperty(router, 'url', 'get').and.returnValue('/my-profile/friends');

    expect(component.ocultarBorrar()).toBeTrue(); // Validación del método
  });

  it('ocultarAgregar() debe devolver false si la ruta es "/my-profile/friends"', () => {
    // Simular la ruta actual
    spyOnProperty(router, 'url', 'get').and.returnValue('/my-profile/friends');

    expect(component.ocultarAgregar()).toBeFalse();
  });
});


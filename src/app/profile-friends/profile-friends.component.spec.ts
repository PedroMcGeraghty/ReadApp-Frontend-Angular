import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastrModule } from 'ngx-toastr';
import { ServiceUser } from '../../service/service-user.service';
import { ProfileFriendsComponent } from './profile-friends.component';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { UserFriendJSON, UserFriend, UserProfile, UserProfileJSON } from '../../domain/tmpUser';
import { AmigosComponent } from '../amigos/amigos.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';


describe('ProfileFriendsComponent', () => {
  let component: ProfileFriendsComponent;
  let fixture: ComponentFixture<ProfileFriendsComponent>;
  let httpClientSpy: jasmine.SpyObj<HttpClient>
  let activatedRouteSpy: jasmine.SpyObj<ActivatedRoute>
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProfileFriendsComponent, ToastrModule.forRoot()
      ],
      providers: [
        { provide: HttpClient, useValue: httpClientSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProfileFriendsComponent);
    component = fixture.componentInstance;
    component.friends = [{
      id: 1, nombreCompleto: 'Amigo 1',
      fotoPath: '',
      username: '',
      fromJSON: function (userFriendJSON: UserFriendJSON): UserFriend {
        throw new Error('Function not implemented.');
      },
      toJSON: function (user: UserProfile): UserProfileJSON {
        throw new Error('Function not implemented.');
      }
    }, {
      id: 2, nombreCompleto: 'Amigo 2',
      fotoPath: '',
      username: '',
      fromJSON: function (userFriendJSON: UserFriendJSON): UserFriend {
        throw new Error('Function not implemented.');
      },
      toJSON: function (user: UserProfile): UserProfileJSON {
        throw new Error('Function not implemented.');
      }
    }];
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('Debe llamar al método ocultar cuando se emita el evento enviarAmigo', () => {
    // Espiar el método ocultar del componente
    spyOn(component, 'ocultar');

    // Obtener la referencia al componente AmigosComponent en el DOM
    const amigosComponent: DebugElement = fixture.debugElement.query(By.directive(AmigosComponent));

    // Disparar el evento enviarAmigo con un valor de prueba (ID del amigo)
    amigosComponent.triggerEventHandler('enviarAmigo', '1');

    // Verificar que el método ocultar fue llamado con el argumento correcto
    expect(component.ocultar).toHaveBeenCalledWith('1');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("Si el booleano de mostrar componente está en false, este NO se muestra en pantalla", () => {
    spyOn(component, 'agregarAmigosNuevos').and.returnValue(false); // Espiamos el método para que devuelva false
    fixture.detectChanges();

    const button = fixture.debugElement.nativeElement.querySelector(`[data-testid="button-agregar"]`);
    expect(button).toBeNull(); // Esperamos que no se encuentre
  });

  it("Si el booleano de mostrar componente está en true, este se muestra en pantalla", () => {
    spyOn(component, 'agregarAmigosNuevos').and.returnValue(true);
    fixture.detectChanges();

    const button = fixture.debugElement.nativeElement.querySelector(`[data-testid="button-agregar"]`);
    expect(button).not.toBeNull();
  });

});

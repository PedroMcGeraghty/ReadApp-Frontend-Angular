import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Cambia a HttpClientTestingModule
import { ActivatedRoute } from '@angular/router';
import { ToastrModule } from 'ngx-toastr'; // Importa ToastrModule
import { ServiceUser } from '../../../service/service-user.service'; // Importa el servicio que causa el error

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let activatedRouteSpy: jasmine.SpyObj<ActivatedRoute>;

  beforeEach(async () => {
    activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', ['snapshot']); // Crea un espía para ActivatedRoute

    await TestBed.configureTestingModule({
      imports: [
        HeaderComponent,
        HttpClientTestingModule, // Usa el módulo de pruebas para HttpClient
        ToastrModule.forRoot() // Agrega ToastrModule
      ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
        { provide: ServiceUser, useValue: jasmine.createSpyObj('ServiceUser', ['someMethod']) } // Simula ServiceUser
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

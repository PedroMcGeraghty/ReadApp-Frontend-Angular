import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PanelPerfilComponent } from './panel-perfil.component';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr'; // Importa ToastrModule

describe('PanelPerfilComponent', () => {
  let component: PanelPerfilComponent;
  let fixture: ComponentFixture<PanelPerfilComponent>;
  let activatedRouteSpy: jasmine.SpyObj<ActivatedRoute>;

  beforeEach(async () => {
    activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', ['snapshot']); // Inicializa el espía

    await TestBed.configureTestingModule({
      imports: [
        PanelPerfilComponent,
        HttpClientTestingModule, // Agrega el módulo de pruebas de HttpClient
        ToastrModule.forRoot() // Importa ToastrModule aquí
      ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

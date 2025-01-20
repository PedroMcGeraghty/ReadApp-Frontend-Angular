import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BotonAgregarComponent } from './boton-agregar.component';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr'; // Importa ToastrModule
import { BookService } from '../../../service/book.service'; // Asegúrate de importar el servicio

describe('BotonAgregarComponent', () => {
  let component: BotonAgregarComponent;
  let fixture: ComponentFixture<BotonAgregarComponent>;
  let activatedRouteSpy: jasmine.SpyObj<ActivatedRoute>;

  beforeEach(async () => {
    activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', ['snapshot']); // Crea un espía para ActivatedRoute

    await TestBed.configureTestingModule({
      imports: [
        BotonAgregarComponent,
        HttpClientTestingModule, // Módulo para pruebas de HttpClient
        ToastrModule.forRoot() // Agrega ToastrModule
      ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
        BookService // Agrega el BookService como proveedor
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotonAgregarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

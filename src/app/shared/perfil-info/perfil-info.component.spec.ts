import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilInfoComponent } from './perfil-info.component';
import { HttpClient } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';


describe('PerfilInfoComponent', () => {
  let component: PerfilInfoComponent;
  let fixture: ComponentFixture<PerfilInfoComponent>;
  let httpClientSpy: jasmine.SpyObj<HttpClient>
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfilInfoComponent, ToastrModule.forRoot()], //Se agrega ToastrModule.forRoot() para que los tests no rompan
      providers: [
        {provide: HttpClient, useValue: httpClientSpy},
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfilInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("Si el booleano de mostrar componente esta en false, este NO se muestra en pantalla", () =>{
    component.mostrarBoton = false
    fixture.detectChanges()

    const form = fixture.debugElement.nativeElement.querySelector(`[data-testid="form-min-max"]`)
    expect(form).toBeNull()
  })

  it("Si el booleano de mostrar componente esta en true, este se muestra en pantalla", () =>{
    component.mostrarBoton = true
    fixture.detectChanges()

    const form = fixture.debugElement.nativeElement.querySelector(`[data-testid="form-min-max"]`)
    expect(form).not.toBeNull()
  })

  it('El boton de Calculador acciona la funcion de mostrar el nuevo div', () =>{
    component.mostrarBoton = false

    fixture.detectChanges()

    spyOn(component, 'mostrar').and.callThrough()
    const checkbox = fixture.debugElement.nativeElement.querySelector(`[data-testid="checkboc-calculador"]`)
    checkbox.dispatchEvent(new Event('change'))
    expect(component.mostrar).toHaveBeenCalled()
    expect(component.mostrarBoton).toBeTrue()
  })

  it("Se muestra el mensaje de error si se ingresan valores no permitidos en un form", () =>{
    const form = fixture.debugElement.nativeElement.querySelector(`[data-testid="test-form"]`)
    form.value = '123'
    form.dispatchEvent(new Event('input'))
    fixture.detectChanges()

    const errorMessage = fixture.debugElement.nativeElement.querySelector(`[data-testid="test-error"]`)
    expect(errorMessage).toBeTruthy()
    expect(errorMessage.textContent).toContain('el campo contiene carácteres no permitidos')
  })


});

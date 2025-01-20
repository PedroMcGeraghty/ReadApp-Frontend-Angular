import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpContext } from '@angular/common/http';
import { getHttpClientSpyLogin } from '../../tests/stubs/httpClientSpyUser';
import { ToastrModule } from 'ngx-toastr';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let activatedRouteSpy: jasmine.SpyObj<ActivatedRoute>
  let httpClientSpy: jasmine.SpyObj<HttpClient>
  beforeEach(async () => {
    httpClientSpy = getHttpClientSpyLogin()
    await TestBed.configureTestingModule({
      imports: [LoginComponent, ToastrModule.forRoot()],
      providers: [
        {provide: ActivatedRoute, useValue: activatedRouteSpy},
        {provide: HttpClient, useValue: httpClientSpy}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Form invalido - No admite campos vacios', () => {
    component.form.setValue({
      [component.formLabels.username]: "", 
      [component.formLabels.password]: "", 
    });

    expect(component.form.valid).toEqual(false);
  });

  it('Form invalido - No admite campos excedidos', () => {
    component.form.setValue({
      [component.formLabels.username]: "123456789", //lenght 8 max
      [component.formLabels.password]: "12345678912345678", //lenght 16 max
    });
    const randomNumber = httpClientSpy.get.apply
    console.log(`RANDOM:${randomNumber}`)
    expect(component.form.valid).toEqual(false);
  });

  it('Form valido - Campos permitidos', () => {
    component.form.setValue({
      [component.formLabels.username]: "adrian",
      [component.formLabels.password]: "adrian",
    });

    expect(component.form.valid).toEqual(true);
  });

  it('Apreto el boton de Log in, recibo correctamente los datos', () => {

    component.form.setValue({
      [component.formLabels.username]: "adrian",
      [component.formLabels.password]: "adrian",
    });

    fixture.detectChanges()

    getByTestId('login').click()

    const userLoginData = httpClientSpy.post.calls.mostRecent().args[1]

    expect(userLoginData[component.formLabels.username]).toEqual("adrian");
    expect(userLoginData[component.formLabels.password]).toEqual("adrian");
  })
  
  function getByTestId(testId: string) {
    const resultHtml = fixture.debugElement.nativeElement
    return resultHtml.querySelector(`[data-testid="${testId}"]`)
  }
});

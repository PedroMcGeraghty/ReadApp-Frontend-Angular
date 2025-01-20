import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAccountFormComponent } from './new-account-form.component';
import { HttpClient } from '@angular/common/http';
import { getHttpClientSpyLogin } from '../../../tests/stubs/httpClientSpyUser';
import { ToastrModule } from 'ngx-toastr';

describe('NewAccountFormComponent', () => {
  let component: NewAccountFormComponent;
  let fixture: ComponentFixture<NewAccountFormComponent>;
  let httpClientSpy: jasmine.SpyObj<HttpClient>
  beforeEach(async () => {
    httpClientSpy = getHttpClientSpyLogin()
    await TestBed.configureTestingModule({
      imports: [NewAccountFormComponent, ToastrModule.forRoot()],
      providers:[
        {provide: HttpClient, useValue: httpClientSpy}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewAccountFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Form invalido - No admite campos vacios', () => {
    component.form.setValue({
      [component.formLabels.email]: "", 
      [component.formLabels.username]: "", 
      [component.formLabels.password]: "", 
      [component.formLabels.name]: "",
    });

    expect(component.form.valid).toEqual(false);
    
  });
  
  it('Form invalido - Formato email incorrecto', () => {
    component.form.setValue({
      [component.formLabels.email]: "adrian",
      [component.formLabels.username]: "adrian", 
      [component.formLabels.password]: "adrian", 
      [component.formLabels.name]: "adrian",
    });

    expect(component.form.controls[component.formLabels.email].valid).toEqual(false);
  });

  it('Form invalido - No admite campos excedidos', () => {
    component.form.setValue({
      [component.formLabels.email]: "adrian@adrian", 
      [component.formLabels.username]: "123456789", //8 CARACTERES MAXIMO
      [component.formLabels.password]: "adrian", 
      [component.formLabels.name]: "adrian",
    });
    const usernameValue = getFormValue(component.formLabels.username)
    
    expect(usernameValue.length).toBeGreaterThan(component.formRestrictions.USERNAME_MAX)

    expect(component.form.controls[component.formLabels.email].valid).toEqual(true);
    expect(component.form.controls[component.formLabels.username].valid).toEqual(false);
  });

  it('Form valido - Campos permitidos', () => {
    component.form.setValue({
      [component.formLabels.email]: "adrian@adrian", 
      [component.formLabels.username]: "adrian", 
      [component.formLabels.password]: "adrian", 
      [component.formLabels.name]: "adrian",
    });

    expect(component.form.controls[component.formLabels.email].valid).toEqual(true);
  });


  it('Correcta envio de datos al backend', () => {

    component.form.setValue({
      [component.formLabels.email]: "adrian@adrian",
      [component.formLabels.username]: "adrian",
      [component.formLabels.password]: "adrian",
      [component.formLabels.name]: "adrian",
    });

    fixture.detectChanges()

    getByTestId('createAccount').click()


    const userLoginData = httpClientSpy.post.calls.mostRecent().args[1]

    expect(userLoginData[component.formLabels.email]).toEqual("adrian@adrian");
    expect(userLoginData[component.formLabels.username]).toEqual("adrian");
    expect(userLoginData[component.formLabels.password]).toEqual("adrian");
    expect(userLoginData[component.formLabels.name]).toEqual("adrian");

  })
  
  function getByTestId(testId: string) {
    const resultHtml = fixture.debugElement.nativeElement
    return resultHtml.querySelector(`[data-testid="${testId}"]`)
  }

  function getFormValue(label:string){
    return component.form.value[label]
  }
});

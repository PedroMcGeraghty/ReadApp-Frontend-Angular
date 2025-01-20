import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncabezadoComponent } from './encabezado.component';
import { ActivatedRoute } from '@angular/router';

// You want to inject a fake ActivatedRoute to your component, since you create it yourself in the test, and the router thus doesn't create it for you and inject an ActivatedRoute
describe('EncabezadoComponent', () => {
  let component: EncabezadoComponent;
  let fixture: ComponentFixture<EncabezadoComponent>;
  let activatedRouteSpy: jasmine.SpyObj<ActivatedRoute>
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        EncabezadoComponent
      ],
      providers: [
        {provide: ActivatedRoute, useValue: activatedRouteSpy},
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EncabezadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

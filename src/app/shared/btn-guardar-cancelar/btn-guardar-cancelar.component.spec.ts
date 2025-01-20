import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnGuardarCancelarComponent } from './btn-guardar-cancelar.component';

describe('BtnGuardarCancelarComponent', () => {
  let component: BtnGuardarCancelarComponent;
  let fixture: ComponentFixture<BtnGuardarCancelarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BtnGuardarCancelarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BtnGuardarCancelarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

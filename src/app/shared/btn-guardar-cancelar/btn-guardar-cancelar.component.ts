import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-btn-guardar-cancelar',
  standalone: true,
  imports: [],
  templateUrl: './btn-guardar-cancelar.component.html',
  styleUrl: './btn-guardar-cancelar.component.css'
})
export class BtnGuardarCancelarComponent {
  @Output() guardar = new EventEmitter<void>();
  @Output() cancelar = new EventEmitter<void>();

  onGuardar() {
    this.guardar.emit();
  }

  onCancelar() {
    this.cancelar.emit();
  }

  verificar(): Boolean {
    return true;
  }

}



import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserFriend } from '../../domain/tmpUser';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-amigos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './amigos.component.html',
  styleUrl: './amigos.component.css'
})

export class AmigosComponent {

  @Input() userFriend!: UserFriend
  @Output() enviarAmigo = new EventEmitter<string>();

  constructor(private router: Router) {
  }

  ocultarBorrar(): boolean {

    // hago un map con las rutas / valor y comparo con el parametro que recibo
    const excludedRoutes = ['/my-profile/friends'];
    return excludedRoutes.includes(this.router.url);
  }

  ocultarAgregar(): boolean {
    // hago un map con las rutas / valor y comparo con el parametro que recibo
    const excludedRoutes = ['/my-profile/new-friends'];
    return excludedRoutes.includes(this.router.url);
  }

  aModificar() {
    this.enviarAmigo.emit(this.userFriend.id.toString())
  }

}


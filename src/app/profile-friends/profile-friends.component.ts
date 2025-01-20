import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { AmigosComponent } from '../amigos/amigos.component';
import { NgFor, NgIf } from '@angular/common';
import { BotonAgregarComponent } from '../shared/boton-agregar/boton-agregar.component';
import { ServiceUser } from '../../service/service-user.service';
import { BtnGuardarCancelarComponent } from '../shared/btn-guardar-cancelar/btn-guardar-cancelar.component';
import { UserFriend, UpdateFriendsMessage } from '../../domain/tmpUser';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile-friends',
  standalone: true,
  imports: [AmigosComponent, NgFor, NgIf, BotonAgregarComponent, BtnGuardarCancelarComponent],
  templateUrl: './profile-friends.component.html',
  styleUrl: './profile-friends.component.css'
})
export class ProfileFriendsComponent implements OnInit {

  friends!: UserFriend[];
  agregoAmigos!: boolean;
  id!: number;
  mensaje!: UpdateFriendsMessage;

  constructor(private userService: ServiceUser, public route: Router, private router: ActivatedRoute) { }
  @HostBinding('style.width') width: string = '100%';

  async ngOnInit() {
    this.id = await this.userService.getLoggedUser()
    this.mensaje = new UpdateFriendsMessage(this.id.toString())
    await this.getFriend()
  }

  async getFriend() {
    try {
      //Cuando agregarAmigosNuevos es true debe devolverme a mis amigos
      this.friends = await this.userService.getUserFriendsByID(this.id, this.agregarAmigosNuevos());
    }
    catch (error: any) {
      if (error instanceof HttpErrorResponse) {
        //Solo me interesa HttpErrorResponde
        console.log(error.error["timestamp"])
        console.log(error.error["status"])
        console.log(error.error["error"])
        console.log(error.error["message"])
        console.log(error.error["path"])
      }
    }
  }

  ocultar(amigo: string) {
    this.mensaje.amigosAModificar.push(amigo)
    this.friends = this.friends.filter(friend => friend.id !== Number(amigo));
  }

  async actualizarAmigos() {
    this.mensaje.agregarAmigos = !this.agregarAmigosNuevos()
    await this.userService.actualizarAmigos(this.mensaje);
  }

  volverHome() {
    this.route.navigate(['home']);
  }

  agregarAmigosNuevos(): boolean {
    const includedRoutes = ['/my-profile/friends'];
    return includedRoutes.includes(this.route.url);
  }

  listIsEmpty(): boolean {
    return this.friends.length === 0
  }

}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { User, UserJSON } from '../domain/user';
import { REST_SERVER_URL } from './configuration';
import { UserBasic, UserBasicJSON, UserProfile, UserProfileJSON, UserInformacion, UserFriendJSON, UserFriend, UpdateFriendsMessage } from '../domain/tmpUser';
import { LoginRequest, NewAccountRequest, PasswordRecoveryRequest } from '../domain/types';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ServiceUser {

  nombreUsuario!: string
  username!: string
  apellidoUsuario!: string
  loggedUserId!: number
  constructor(private httpClient: HttpClient, private toastr: ToastrService) { }

  async getUsers(): Promise<User[]> {
    const users$ = this.httpClient.get<UserJSON[]>(REST_SERVER_URL + '/users')
    const usersJSON = await lastValueFrom(users$)
    return usersJSON.map((userJSON) => User.fromJson(userJSON))
  }

  async setLoggedUser(id: number): Promise<void> {
    localStorage.setItem('loggedUser', id.toString())
  }

  async getLoggedUser(): Promise<number> {
    return +(localStorage.getItem('id')!)
  }


  async getUserBasicByID(id: number): Promise<UserBasic> {
    const user$ = this.httpClient.get<UserBasicJSON>(REST_SERVER_URL + '/user/basic/' + id.toString())
    const user = await (lastValueFrom(user$))
    const userBasic = UserBasic.prototype.fromJSON(user)
    this.actualizarNombreYAlias(userBasic.nombre, userBasic.username, userBasic.apellido)
    return userBasic

  }

  async getUserProfileByID(id: number): Promise<UserInformacion> {
    const user$ = this.httpClient.get<UserInformacion>(REST_SERVER_URL + '/user/profile/' + id.toString())
    const user = await (lastValueFrom(user$))
    return user
  }

  async login(loginRequest: LoginRequest): Promise<LoginResponse> {
    const loginResponse$ = this.httpClient.post<LoginResponse>(REST_SERVER_URL + '/login', loginRequest)
    const loginResponse = await (lastValueFrom(loginResponse$))
    this.loggedUserId = loginResponse.userID
    return loginResponse
  }



  async actualizarInfoUsuario(infoNueva: UserInformacion) {
    await lastValueFrom(this.httpClient.put<UserInformacion>(
      REST_SERVER_URL + '/updateInfoUsuario',
      infoNueva
    ))
    this.actualizarNombreYAlias(infoNueva.nombre, infoNueva.username, infoNueva.apellido)
  }

  async getUserFriendsByID(id: number, muestroAmigos: boolean): Promise<UserFriend[]> {
    const user$ = this.httpClient.get<UserFriendJSON[]>(REST_SERVER_URL + '/user/friends', {
      params: {id:id, muestroAmigos: muestroAmigos}})
    const user = await (lastValueFrom(user$))
    const userFriend: UserFriend[] = user.map((it: UserFriendJSON) => UserFriend.prototype.fromJSON(it))
    return userFriend
  }

  async newAccount(newAccountRequest: NewAccountRequest): Promise<MessageResponse> {
    const newAccountResponse$ = this.httpClient.post<MessageResponse>(REST_SERVER_URL + '/createAccount', newAccountRequest)
    const newAccountResponse = await (lastValueFrom(newAccountResponse$))
    return newAccountResponse
  }

  async passwordRecovery(passwordRecoveryRequest: PasswordRecoveryRequest): Promise<MessageResponse> {
    const response$ = this.httpClient.post<MessageResponse>(REST_SERVER_URL + '/passwordRecovery', passwordRecoveryRequest)
    const response = await (lastValueFrom(response$))
    return response
  }

  async actualizarNombreYAlias(nombre?: string, username?: string, apellido?: string) {
    if (nombre != null) {
      this.nombreUsuario = nombre
    }
    if (username != null) {
      this.username = username
    }
    if (apellido != null) {
      this.apellidoUsuario = apellido
    }
  }

  async actualizarAmigos(mensaje: UpdateFriendsMessage) {
    try {
      await lastValueFrom(this.httpClient.put<UpdateFriendsMessage>(
        REST_SERVER_URL + '/updateAmigos', mensaje
      )).then(() => this.toastr.success('Guardado exitosamente'))
    } catch (error) {
      this.toastr.error('Reintente más tarde', 'ERROR')
    }
  }
}

export type LoginResponse = {
  userID: number
}

export type MessageResponse = {
  message: string
}

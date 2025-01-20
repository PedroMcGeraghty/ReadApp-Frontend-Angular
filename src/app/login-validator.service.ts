import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UserJSON } from '../domain/user';
import { REST_SERVER_URL } from '../service/configuration';
import { firstValueFrom, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginValidatorService {

  constructor(private httpClient: HttpClient) { }


  async search(user: string, password: string): Promise<Boolean> {
    const response = await lastValueFrom(this.httpClient.post(
      `${REST_SERVER_URL}/loginValid`,
      { user, password }
    ));
    const UsuarioValido = await lastValueFrom(this.httpClient.get<[]>(
      `${REST_SERVER_URL}/loginValid`

    ));
    return true;
  }


}

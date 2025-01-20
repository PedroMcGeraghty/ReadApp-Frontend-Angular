import { Injectable, Input, EventEmitter } from '@angular/core';
import { Recommendation, RecommendationCard, RecommendationCardJSON, RecommendationJSON } from '../domain/recommendation';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { REST_SERVER_URL } from './configuration';
import { lastValueFrom } from 'rxjs';
import { Valoration, ValorationJSON } from '../domain/valoration';
import { Router } from '@angular/router';
import { MessageResponse } from './service-user.service';
import { ToastService } from './toast.service';


@Injectable({
  providedIn: 'root'
})
export class RecommendationService {
  @Input() filtro: string = "";
  filtroCambiado = new EventEmitter<string>(); // necesito emitir el cambio de criterio de busqueda
  constructor(private httpClient: HttpClient, private toast: ToastService, private router: Router) { }

  async getRecommendations(): Promise<Recommendation[]> {
    const recommendations$ = this.httpClient.get<RecommendationJSON[]>(REST_SERVER_URL + '/recommendations')
    const recommendationsJSON = await lastValueFrom(recommendations$)
    return recommendationsJSON.map((recommendationJSON) => Recommendation.fromJson(recommendationJSON))
  }

  async getRecommendationsFilter(filtro: string): Promise<RecommendationCard[]> {
    const recommendations$ = this.httpClient.get<RecommendationCardJSON[]>(REST_SERVER_URL + '/recommendations/filter', {
      params: { filtro: filtro }
    })
    const recommendationsJSON = await lastValueFrom(recommendations$)
    return recommendationsJSON.map((recommendationJSON) => RecommendationCard.fromJson(recommendationJSON))
  }

  async getRecommendationById(id: number): Promise<Recommendation> {
    const recommendation$ = this.httpClient.get<RecommendationJSON>(REST_SERVER_URL + '/recommendations/' + id)
    const recommendationJSON = await lastValueFrom(recommendation$)
    return Recommendation.fromJson(recommendationJSON)
  }

  async actualizarRecomendacion(recomendacion: Recommendation) {
      const recomendacionNueva = await lastValueFrom(this.httpClient.put<RecommendationJSON>(
        REST_SERVER_URL + `/recommendations`,
        recomendacion.toEditarJSON()
      ))
      return recomendacionNueva   
 
  }

  async createRecommendations(recomendacion: Recommendation): Promise<Recommendation> {
    const recomendacionNueva = await lastValueFrom(this.httpClient.post<RecommendationJSON>(
        REST_SERVER_URL + `/recommendations`,
        recomendacion.toCreateJSON()
    ));
    //this.toast.success('Recomendacion creada con exito')
    return Recommendation.fromJson(recomendacionNueva) 
}

  // si es true = home, si es false = private
  async getUserRecommendations(estado: boolean): Promise<RecommendationCard[]> {
    const recommendations$ = this.httpClient.get<RecommendationCardJSON[]>(REST_SERVER_URL + '/recommendationsLoggedUser', {
      params: { privada: estado }
    });
    const recommendationsJSON = await lastValueFrom(recommendations$);
    return recommendationsJSON.map((recommendationJSON) => RecommendationCard.fromJson(recommendationJSON));
  }
  async getAllRecommendations(): Promise<RecommendationCard[]> {
    const recommendations$ = this.httpClient.get<RecommendationCardJSON[]>(REST_SERVER_URL + '/recommendations');
    const recommendationsJSON = await lastValueFrom(recommendations$);
    return recommendationsJSON.map((recommendationJSON) => RecommendationCard.fromJson(recommendationJSON));
  }
  async agregarValoracion(valoracion: Valoration, idRecommendation: number) {
      const valoracionNueva = await lastValueFrom(this.httpClient.put<ValorationJSON>(
        REST_SERVER_URL + `/recommendations/${idRecommendation}`,
        valoracion.toJSON()
      ))
      return valoracionNueva 
  }

  async deleteRecommendation(idRecommendation: number) {
    try {
      const response = await lastValueFrom(this.httpClient.delete<MessageResponse>(REST_SERVER_URL + `/delete/recommendation/${idRecommendation}`))
      this.toast.showToast(`${response.message}`, 'success');
    } catch (error: any) {
        this.errorHandler(error)
    }
  }

  async getRecommendationsToValue():Promise<RecommendationCard[]> {
    const recommendations$ = this.httpClient.get<RecommendationCardJSON[]>(REST_SERVER_URL + `/recommendationsToValue`)
    const recommendationJSON_LIST = await lastValueFrom(recommendations$);
    return recommendationJSON_LIST.map((recommendationJSON) => RecommendationCard.fromJson(recommendationJSON));

  }
  async errorHandler(error: any) {
    if (error instanceof HttpErrorResponse) {
      if (error.error['status'] == null) {
        this.toast.showToast('Servidor caido :,(. Intente mas tarde', 'error');
      }
      if (error.error['status'] == 400) {
        this.toast.showToast(`${error.error['message']}`, 'warning');
      }

      if (error.error['status'] == 404) {
        this.toast.showToast(`${error.error['message']}`, 'info');
      }
    }
    else{
      this.toast.showToast("Error externo:,(. Intente mas tarde", 'success');
    }
  }

  async getRecommendationsByProfile():Promise<RecommendationCard[]> {
    const recommendations$ = this.httpClient.get<RecommendationCardJSON[]>(REST_SERVER_URL + `/recommendationsByProfile`)
    const recommendationJSON_LIST = await lastValueFrom(recommendations$);
    return recommendationJSON_LIST.map((recommendationJSON) => RecommendationCard.fromJson(recommendationJSON));

  }

  async addToValueLater(id:number):Promise<void> {
    try {
      const response = await lastValueFrom(this.httpClient.put<MessageResponse>(REST_SERVER_URL + `/addToValueLater/${id}`, {id}))
      this.toast.showToast(`${response.message}`, 'success');
      
    } catch (error: any) {
        this.errorHandler(error)
    }

  }
}


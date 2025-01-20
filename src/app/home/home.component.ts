import { Component, OnInit } from '@angular/core';
import { RecomendacionComponent } from '../shared/recomendacion/recomendacion.component';

import { RecommendationService } from '../../service/recommendation.service';
import { RecommendationCard } from '../../domain/recommendation';
import { NavComponent } from '../nav/nav.component';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { NgIf } from '@angular/common';
import { ToastService } from '../../service/toast.service';
import { BotonAgregarComponent } from "../shared/boton-agregar/boton-agregar.component";
import { NavigationService } from '../../service/navigation.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RecomendacionComponent, NavComponent, NgIf, BotonAgregarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  recommendations: RecommendationCard[] = [];
  filtro: string = ""
  
  
  flagsEmptyRecommendation = {
    allRecommendations: false,
    userRecommendations: false,
    filterRecommendations: false
  }

  constructor(
    private recommendationService: RecommendationService,
    private activatedRt: ActivatedRoute,
    private rt: Router,
    private toast: ToastService,
    public nvgtService: NavigationService
  ) { }

  async ngOnInit() {
    this.activatedRt.params.subscribe(async params => {

      this.showRecommendations(params)

    });
  }

  async showRecommendations(params:Params){
    if (params['privates'] !== undefined) {

      const privateOnly = params['privates'] === 'true'; // Convert to boolean
      this.showUserRecommendations(privateOnly)

    } else {

      this.showAllRecommendations()

    }
  }
  async addFilter(newFilter: string) {
    try {
      this.filtro = newFilter;
      this.recommendations = await this.recommendationService.getRecommendationsFilter(this.filtro)
      this.showInteractiveEmptyResponse('No se encontraron recomendaciones','filterRecommendations')
    } catch (error) {
      if(error instanceof HttpErrorResponse){
        this.toast.showToast(`${error.error['message']}`, 'error');  
      }
      
    }
  }

  async showAllRecommendations() {
    this.recommendations = await this.recommendationService.getRecommendationsByProfile()
    this.showInteractiveEmptyResponse('No se encontraron recomendaciones','allRecommendations')
  }

  async showUserRecommendations(privates: boolean) {
    this.recommendations = await this.recommendationService.getUserRecommendations(privates)
    this.showInteractiveEmptyResponse('No se encontraron recomendaciones','userRecommendations')
  }

  showInteractiveEmptyResponse(message:string, keyFlag:keyFlag){
    if(this.checkEmptyRecommendationsResponse()){
      this.flagsEmptyRecommendation[keyFlag] = true
      this.toast.showToast(message, 'info');
    } else{ 
      this.flagsEmptyRecommendation[keyFlag] = false
    }
  }

  checkEmptyRecommendationsResponse(){
    return this.recommendations.length === 0
  }

}

type keyFlag = keyof typeof HomeComponent.prototype.flagsEmptyRecommendation
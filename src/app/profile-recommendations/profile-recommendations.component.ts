import { Component, HostBinding } from '@angular/core';
import { RecomendacionComponent } from '../shared/recomendacion/recomendacion.component';
import { Recommendation, RecommendationCard } from '../../domain/recommendation';
import { RecommendationService } from '../../service/recommendation.service';
import { BtnGuardarCancelarComponent } from '../shared/btn-guardar-cancelar/btn-guardar-cancelar.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from '../../service/toast.service';
import { NavigationService } from '../../service/navigation.service';

@Component({
  selector: 'app-profile-recommendations',
  standalone: true,
  imports: [RecomendacionComponent, BtnGuardarCancelarComponent],
  templateUrl: './profile-recommendations.component.html',
  styleUrl: './profile-recommendations.component.css'
})
export class ProfileRecommendationsComponent {
  @HostBinding('style.width') width: string = '100%';
  
  recommendations: RecommendationCard[] = []

  flagsEmptyRecommendation!:boolean

  constructor(
    private recommendationService: RecommendationService,
    private toast: ToastService,
    public nvgtService: NavigationService
  ) { }

  async ngOnInit() {
    try {
      this.recommendations = await this.recommendationService.getRecommendationsToValue()

    } catch (error: any) {
      if(error instanceof HttpErrorResponse){
        if(error.error['status']==null){
          this.toast.showToast('Servidor caido', 'error'); 
        }
      }
    }
  }

  checkEmptyRecommendationsResponse(){
    return this.recommendations.length === 0
  }
}

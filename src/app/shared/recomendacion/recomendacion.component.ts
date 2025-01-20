import { Component, Input } from '@angular/core';
import { Recommendation, RecommendationCard } from '../../../domain/recommendation';
import { Router } from '@angular/router';
import { ButtonHoverPressedDirective } from '../directives/button-hover-pressed.directive';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { RecommendationService } from '../../../service/recommendation.service';
@Component({
  selector: 'app-recomendacion',
  standalone: true,
  imports: [ButtonHoverPressedDirective,RouterLink, NgIf],
  templateUrl: './recomendacion.component.html',
  styleUrl: './recomendacion.component.css'
})
export class RecomendacionComponent {
  @Input() recomendacion: RecommendationCard = new RecommendationCard()
  constructor(
    private router: Router,
    private service:RecommendationService
  ){}

  goTo(option: string) {
    this.router.navigate([option])
  }

  async deleteRecommendation() {
    await this.service.deleteRecommendation(this.recomendacion.id)
    setTimeout(() => {
      window.location.reload();
    }, 2000); 
  }

  async addToValueLater() {
    await this.service.addToValueLater(this.recomendacion.id)
    setTimeout(() => {
      window.location.reload();
    }, 2000); 
  }

  round(numberFloat:number){
    return Math.round(numberFloat)
  }
}

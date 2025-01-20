import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileRecommendationsComponent } from './profile-recommendations.component';
import { HttpClient } from '@angular/common/http';
import { RecommendationService } from '../../service/recommendation.service';
import { recommendationCardStubJSON } from '../../tests/stubs/httpClientSpyRecommendations';
import { RecommendationCard } from '../../domain/recommendation';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

describe('ProfileRecommendationsComponent', () => {
  let component: ProfileRecommendationsComponent;
  let fixture: ComponentFixture<ProfileRecommendationsComponent>;
  let httpClientSpy: jasmine.SpyObj<HttpClient>
  let service: jasmine.SpyObj<RecommendationService>
  const activatedRouteMock = {

    params: of({}), // No parameters in this case

    snapshot: {

      url: [{ path: 'home' }] // Set the URL to /home

    }

  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileRecommendationsComponent],
      providers: [
        { provide: HttpClient, useValue: httpClientSpy},
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: RecommendationService, useValue: jasmine.createSpyObj('RecommendationService', ['getRecommendationsToValue']) }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileRecommendationsComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(RecommendationService) as jasmine.SpyObj<RecommendationService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Empieza con 2 recomendaciones a valorar', async () => {
    service.getRecommendationsToValue.and.returnValue(Promise.resolve(recommendationCardStubJSON.map(RecommendationCard.fromJson)));
    
    await component.ngOnInit();
    fixture.detectChanges();
    
    expect(component.recommendations).toEqual(recommendationCardStubJSON.map(RecommendationCard.fromJson));
    expect(component.recommendations.length).toBe(2)
  })

  it('Recomendaciones accesibles mediante data-testid', async () => {
    service.getRecommendationsToValue.and.returnValue(Promise.resolve(recommendationCardStubJSON.map(RecommendationCard.fromJson)));

    await component.ngOnInit();
    fixture.detectChanges();

    expect(component.recommendations).toEqual(recommendationCardStubJSON.map(RecommendationCard.fromJson))

    const recommendation_1 = getByTestId('id_1')
    const recommendation_2 = getByTestId('id_2')

    expect(recommendation_1).toBeTruthy()
    expect(recommendation_2).toBeTruthy()
  })

  function getByTestId(testId: string) {
    const resultHtml = fixture.debugElement.nativeElement
    return resultHtml.querySelector(`[data-testid="${testId}"]`)
  }

});

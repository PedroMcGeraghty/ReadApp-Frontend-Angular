import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { HttpClient } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { getHttpClientSpyHome, recommendationCardStubJSON } from '../../tests/stubs/httpClientSpyRecommendations';
import { RecommendationService } from '../../service/recommendation.service';
import { RecommendationCard } from '../../domain/recommendation';
import { of } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let httpClientSpy: jasmine.SpyObj<HttpClient>
  let routerSpy: jasmine.SpyObj<Router>
  let service: jasmine.SpyObj<RecommendationService>
  const activatedRouteMock = {

    params: of({}), // No parameters in this case

    snapshot: {

      url: [{ path: 'home' }] // Set the URL to /home

    }

  };
  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate', 'navigateByUrl'])
    httpClientSpy = getHttpClientSpyHome()
    await TestBed.configureTestingModule({
      imports: [HomeComponent, ToastrModule.forRoot()],
      providers: [
        { provide: HttpClient, useValue: httpClientSpy },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: RecommendationService, useValue: jasmine.createSpyObj('RecommendationService', ['getRecommendationsByProfile', 'getUserRecommendations']) }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(RecommendationService) as jasmine.SpyObj<RecommendationService>;
    fixture.detectChanges();
  });

  it('should create', async () => {
    expect(component).toBeTruthy();
  });


  it('EL componente inicia con 2 recomendaciones', async () => {
    service.getRecommendationsByProfile.and.returnValue(Promise.resolve(recommendationCardStubJSON.map(RecommendationCard.fromJson)));
    
    await component.ngOnInit();
    fixture.detectChanges();
    
    expect(component.recommendations).toEqual(recommendationCardStubJSON.map(RecommendationCard.fromJson));
    expect(component.recommendations.length).toBe(2)
  })

  it('La recomendacion 1 y 2 existen', async () => {
    service.getRecommendationsByProfile.and.returnValue(Promise.resolve(recommendationCardStubJSON.map(RecommendationCard.fromJson)));
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

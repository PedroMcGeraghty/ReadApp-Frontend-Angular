import { of } from "rxjs/internal/observable/of"
import { Recommendation, RecommendationCard, RecommendationCardJSON } from "../../domain/recommendation"
import { REST_SERVER_URL } from "../../service/configuration"

export const recommendationCardStubJSON:Array<RecommendationCardJSON> = [
    new RecommendationCard(1,"",true, true, true, true,"", ["",""], 5, 5),
    new RecommendationCard(2,"",true, true, true, true,"" ,["",""], 3, 3),
].map((recommendacionCard)=> recommendacionCard.toJSON())

export const getHttpClientSpyHome = () => {
  const httpClientSpy = jasmine.createSpyObj('HttpClient', [
    'get',
    'put',
    'post'
  ])
  httpClientSpy.post.and.callFake(() => {
    const randomNumber = Math.floor(Math.random()*10);

    console.log('Generated random number:', randomNumber);

    return of(randomNumber);
  })

  httpClientSpy.get
    .withArgs(`${REST_SERVER_URL}/recommendations`)
    .and.returnValue(of(recommendationCardStubJSON))

  return httpClientSpy
}

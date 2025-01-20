import { of } from "rxjs/internal/observable/of"

export const getHttpClientSpyLogin = () => {
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

  httpClientSpy.get.and.returnValue(() => {
    const randomNumber = Math.floor(Math.random()*10);

    console.log('Generated random number:', randomNumber);

    return of(randomNumber);
  })
  
  return httpClientSpy
}

import { of } from 'rxjs'
import { BOOKS } from '../../mock/mockBooks'
import { REST_SERVER_URL } from '../../service/configuration'


export const booksStub = BOOKS.map((book) => book.toJSON())

export const httpClientSpy = () => {
  const httpClientSpy = jasmine.createSpyObj('HttpClient', [
    'get',
    'put',
    'post'
  ])

  //El spy permite emular un endpoint
  httpClientSpy.get
    .withArgs(`${REST_SERVER_URL}/libros`)
    .and.returnValue(of(booksStub))

  httpClientSpy.get
    .withArgs(`${REST_SERVER_URL}/libros/1`)
    .and.returnValue(of(booksStub[0]))

  return httpClientSpy
}
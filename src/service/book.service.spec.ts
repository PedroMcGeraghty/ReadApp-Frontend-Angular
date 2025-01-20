// import { TestBed } from '@angular/core/testing';
// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// import { BookService } from './book.service';
// import { Book, BookJSON } from '../domain/book';
// import { REST_SERVER_URL } from './configuration';
// import { ToastrModule } from 'ngx-toastr';
// import { Component } from '@angular/core';

// describe('BookService', () => {
//   let service: BookService;
//   let httpTestingController: HttpTestingController;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule, ToastrModule.forRoot()],
//       providers: [BookService]
//     });

//     service = TestBed.inject(BookService);
//     httpTestingController = TestBed.inject(HttpTestingController);
//   });

//   afterEach(() => {
//     httpTestingController.verify();
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });

//   const mockBooks: BookJSON[] = [
//     {
//       autor: 'pablito',
//       cantidadPalabras: 100,
//       cantidadPaginas: 100,
//       ventasSemanales: 100,
//       traducciones: ['español'],
//       titulo: 'el libro de pablito',
//       id: 1,
//       imagen: 'imagen'
//     },
//     {
//       autor: 'maria',
//       cantidadPalabras: 200,
//       cantidadPaginas: 150,
//       ventasSemanales: 200,
//       traducciones: ['ingles'],
//       titulo: 'el libro de maria',
//       id: 2,
//       imagen: 'imagen2'
//     }
//   ];

//   const expectedBooks: Book[] = mockBooks.map(Book.fromJson);

//   it('search books : me traigo los libros de la app', async () => {
//     service.obtenerLibros().then(books => {
//       expect(books).toEqual(expectedBooks);
//     });

//     const req = httpTestingController.expectOne(`${REST_SERVER_URL}/librosSearch`);
//     expect(req.request.method).toEqual('GET');
//     req.flush(mockBooks);  // Simula la respuesta con los libros mock
//   });

//   it('debería manejar errores al obtener libros', async () => {
//     const errorResponse = { message: 'Error de prueba' };

//     // Aquí simula un error del backend
//     service.obtenerLibros().catch(error => {
//       expect(error).toEqual(errorResponse);
//     });

//     const req = httpTestingController.expectOne(`${REST_SERVER_URL}/librosSearch`);
//     expect(req.request.method).toEqual('GET');
//     req.flush(errorResponse, { status: 404, statusText: 'Not Found' });
//   });

//   it('filtrar libros: debería traer los libros que filtra el search', async () => {
//     const filtro = 'el libro de';

//     service.obtenerLibrosFiltrados(filtro).then(books => {
//       expect(books).toEqual(expectedBooks);
//     });

//     const req = httpTestingController.expectOne(`${REST_SERVER_URL}/librosSearch/filter?filtro=el%20libro%20de`);
//     expect(req.request.method).toEqual('GET');
//   });

//   it('filtrar libros: lista vacia', async () => {
//     const filtro = 'no-existe';  // filtro que no coincida con ningún libro

//     service.obtenerLibrosFiltrados(filtro).then(books => {
//       expect(books).toEqual([]);  // devuelve una lista vacía
//     });

//     const req = httpTestingController.expectOne(`${REST_SERVER_URL}/librosSearch/filter?filtro=no-existe`);
//     expect(req.request.method).toEqual('GET');
//     req.flush([]);  // respuesta vacía desde el backend
//   });



//   it('obtener libros segun estado (leido / no leido)', async () => {
//     const idUser = 1;
//     const estado = true;

//     service.obtenerLibrosPorEstado(estado).then(books => {
//       expect(books).toEqual(expectedBooks);
//     });

//     const req = httpTestingController.expectOne(`${REST_SERVER_URL}/obtenerlibroEstado?idUser=${idUser}&estado=${estado}`);
//     expect(req.request.method).toEqual('GET');
//     expect(req.request.params.get('idUser')).toEqual('1');
//     expect(req.request.params.get('estado')).toEqual('true');

//   });

//   it('agregar un libro a leidos', async () => {
//     const idUser = 1;
//     const idLibro = [1];
//     const estado = true;

//     service.agregarLibro(idLibro, estado).then(() => {
//       expect().nothing();
//     });

//     const req = httpTestingController.expectOne(`${REST_SERVER_URL}/agregarLibroEstado`);
//     expect(req.request.method).toEqual('PUT');
//     expect(req.request.body).toEqual({ idUser, estado, idLibro });
//   });

//   it('eliminar un libro de leidos', async () => {
//     const idUser = 1;
//     const idLibro = [1, 2];
//     const estado = true;

//     service.eliminarLibro(idLibro, estado).then(() => {
//       expect().nothing();
//     });

//     const req = httpTestingController.expectOne(`${REST_SERVER_URL}/eliminarLibroEstado`);
//     expect(req.request.method).toEqual('DELETE');
//     expect(req.request.body).toEqual({ idUser, estado, idLibro });
//   });
// });

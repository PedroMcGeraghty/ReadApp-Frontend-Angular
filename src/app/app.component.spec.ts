import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

describe('AppComponent', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>
  let activatedRouteSpy: jasmine.SpyObj<ActivatedRoute>
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        {provide: HttpClient, useValue: httpClientSpy},
        {provide: ActivatedRoute, useValue: activatedRouteSpy}
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'readapp-2024-grupo-9' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('readapp-2024-grupo-9');
  });

});

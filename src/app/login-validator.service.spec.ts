import { TestBed } from '@angular/core/testing';

import { LoginValidatorService } from './login-validator.service';
import { HttpClient } from '@angular/common/http';

describe('LoginValidatorService', () => {
  let service: LoginValidatorService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>
  beforeEach(() => {
    TestBed.configureTestingModule(
        { providers: [
            {provide: HttpClient, useValue:httpClientSpy}
          ] 
        }
    );
    service = TestBed.inject(LoginValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService]
    });
    authService = TestBed.inject(AuthService);
  });

  afterEach(() => {
    sessionStorage.clear();
  });

  it('should set and get token', () => {
    const token = 'testToken';
    authService.setToken(token);
    expect(authService.getToken()).toBe(token);
  });

  it('should return false if token is not set', () => {
    expect(authService.isLoggedIn()).toBeFalse();
  });

  it('should return true if token is set', () => {
    const token = 'testToken';
    authService.setToken(token);
    expect(authService.isLoggedIn()).toBeTrue();
  });
});

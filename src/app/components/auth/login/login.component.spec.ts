import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);
    const authServiceSpyObj = jasmine.createSpyObj('AuthService', ['setToken']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        { provide: Router, useValue: routerSpyObj },
        { provide: AuthService, useValue: authServiceSpyObj }
      ],
      imports: [HttpClientTestingModule, FormsModule]
    }).compileComponents();

    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    httpTestingController = TestBed.inject(HttpTestingController);

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit form and set token', () => {
    const token = 'test-token';
    const dummyResponse = { data: [] };

    component.token = token;
    component.onSubmit();

    const req = httpTestingController.expectOne('https://gorest.co.in/public/v2/users');
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${token}`);

    req.flush(dummyResponse);

    expect(authServiceSpy.setToken).toHaveBeenCalledWith(token);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['users']);
  });

  it('should handle error', () => {
    const token = 'test-token';
    const errorMessage = 'Invalid token';

    component.token = token;
    component.onSubmit();

    const req = httpTestingController.expectOne('https://gorest.co.in/public/v2/users');
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${token}`);

    req.error(new ErrorEvent('error'), { status: 400, statusText: errorMessage });

    httpTestingController.verify(); // Verifica che tutte le richieste siano state gestite

    fixture.detectChanges(); // Aggiorna la vista della componente

    expect(component.errorMessage).toBe(errorMessage);
    expect(authServiceSpy.setToken).not.toHaveBeenCalled();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });


});

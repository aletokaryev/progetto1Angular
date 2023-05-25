import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NavComponent } from './nav.component';
import { AuthService } from 'src/app/services/auth.service';
import { MaterialUiModule } from 'src/app/material/material.module';


describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavComponent],
      providers: [AuthService],
      imports: [MaterialUiModule]
    });

    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have an instance of AuthService', () => {
    expect(component.auth).toBeDefined();
    expect(component.auth instanceof AuthService).toBe(true);
  });


});

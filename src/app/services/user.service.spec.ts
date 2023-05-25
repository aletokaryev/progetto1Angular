import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get a list of users', () => {
    const perPage = 10;
    const currentPage = 1;
    const token = 'your-token';

    service.getUsers(perPage, currentPage, token).subscribe((users) => {
      expect(users).toBeDefined();
    });

    const req = httpMock.expectOne(`https://gorest.co.in/public/v2/users?page=${currentPage}&per_page=${perPage}`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.has('Authorization')).toBe(true);
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${token}`);

    const mockResponse = {  };
    req.flush(mockResponse);
  });

  it('should get a specific user by ID', () => {
    const id = 1;
    const token = 'your-token';

    service.getUserById(id, token).subscribe((user) => {
      expect(user).toBeDefined();
    });

    const req = httpMock.expectOne(`https://gorest.co.in/public/v2/users/${id}`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.has('Authorization')).toBe(true);
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${token}`);

    const mockResponse = { };
    req.flush(mockResponse);
  });

  it('should delete a specific user by ID', () => {
    const userID = 1;
    const token = 'your-token';

    service.deleteUser(userID, token).subscribe(() => {
    });

    const req = httpMock.expectOne(`https://gorest.co.in/public/v2/users/${userID}`);
    expect(req.request.method).toBe('DELETE');
    expect(req.request.headers.has('Authorization')).toBe(true);
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${token}`);

    req.flush(null);
  });

  it('should get posts of a specific user by ID', () => {
    const id = 1;
    const token = 'your-token';

    service.getUserPost(id, token).subscribe((posts) => {
      expect(posts).toBeDefined();
    });

    const req = httpMock.expectOne(`https://gorest.co.in/public/v2/users/${id}/posts`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.has('Authorization')).toBe(true);
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${token}`);

    const mockResponse = { };
    req.flush(mockResponse);
  });

  it('should create a new user', () => {
    const user = { email: 'test@example.com', name: 'Test User', gender: 'male', status: 'active' };
    const token = 'your-token';

    service.createUser(user, token).subscribe((newUser) => {
      expect(newUser).toBeDefined();

    });

    const req = httpMock.expectOne(`https://gorest.co.in/public/v2/users`);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.has('Authorization')).toBe(true);
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${token}`);
    expect(req.request.body).toEqual({
      email: user.email,
      name: user.name,
      gender: user.gender,
      status: user.status
    });

    const mockResponse = {  };
    req.flush(mockResponse);
  });


});

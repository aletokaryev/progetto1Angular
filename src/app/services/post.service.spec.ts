import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PostService } from './post.service';

describe('PostService', () => {
  let postService: PostService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PostService],
    });

    postService = TestBed.inject(PostService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create a new post', () => {
    const post = {
      user: 'John',
      title: 'New Post',
      body: 'This is the body of the new post.',
    };
    const token = 'test-token';

    postService.createPost(post, token).subscribe();

    const req = httpTestingController.expectOne('https://gorest.co.in/public/v2/posts');
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${token}`);
    expect(req.request.body).toEqual({
      user: post.user,
      user_id: post.user,
      title: post.title,
      body: post.body,
    });

    req.flush({});
  });

  it('should get a list of posts', () => {
    const perPage = 10;
    const currentPage = 1;
    const token = 'test-token';

    postService.getPosts(perPage, currentPage, token).subscribe();

    const req = httpTestingController.expectOne(
      `https://gorest.co.in/public/v2/posts?page=${currentPage}&per_page=${perPage}`
    );
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${token}`);

    req.flush({});
  });

  it('should delete a specific post', () => {
    const postID = 1;
    const token = 'test-token';

    postService.deletePost(postID, token).subscribe();

    const req = httpTestingController.expectOne(`https://gorest.co.in/public/v2/posts/${postID}`);
    expect(req.request.method).toBe('DELETE');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${token}`);

    req.flush({});
  });

  it('should get comments of a specific post', () => {
    const postID = 1;
    const token = 'test-token';

    postService.getPostComments(postID, token).subscribe();

    const req = httpTestingController.expectOne(`https://gorest.co.in/public/v2/posts/${postID}/comments`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${token}`);

    req.flush({});
  });

  it('should create a new comment', () => {
    const post = {
      name: 'John',
      email: 'john@example.com',
      body: 'This is a new comment.',
    };
    const postID = 1;
    const token = 'test-token';

    postService.createComment(post, postID, token).subscribe();

    const req = httpTestingController.expectOne(`https://gorest.co.in/public/v2/posts/${postID}/comments`);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${token}`);
    expect(req.request.body).toEqual({
      name: post.name,
      email: post.email,
      body: post.body,
    });

    req.flush({});
  });
});

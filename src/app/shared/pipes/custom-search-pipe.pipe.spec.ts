import { CustomSearchPipe } from "./custom-search-pipe.pipe";

describe('CustomSearchPipe', () => {
  let pipe: CustomSearchPipe;

  beforeEach(() => {
    pipe = new CustomSearchPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return items unchanged when term is empty', () => {
    const items = [{ name: 'John' }, { name: 'Jane' }];
    const term = '';
    const result = pipe.transform(items, term);
    expect(result).toEqual(items);
  });

  it('should return items unchanged when items array is empty', () => {
    const items: never[] = [];
    const term = 'John';
    const result = pipe.transform(items, term);
    expect(result).toEqual(items);
  });

  it('should filter items based on the term', () => {
    const items = [
      { name: 'John', age: 30 },
      { name: 'Jane', age: 25 },
      { name: 'Bob', age: 35 }
    ];
    const term = 'John';
    const result = pipe.transform(items, term);
    expect(result).toEqual([{ name: 'John', age: 30 }]);
  });

  it('should exclude properties when filtering', () => {
    const items = [
      { name: 'John', age: 30 },
      { name: 'Jane', age: 25 },
      { name: 'Bob', age: 35 }
    ];
    const term = 'John';
    const excludes = ['age'];
    const result = pipe.transform(items, term, excludes);
    expect(result).toEqual([{ name: 'John', age: 30 }]);
  });


});

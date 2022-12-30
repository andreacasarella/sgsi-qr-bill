import {EntrySetPipe} from './entry-set.pipe';

describe('EntrySetPipe', () => {
  let pipe: EntrySetPipe;
  beforeEach(() => {
    pipe = new EntrySetPipe();
  });
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
  it('should return empty array', () => {
    const input = null;
    const actual = pipe.transform(input);
    expect(actual).toEqual([]);
  });
  it('should transform and return map to entries', () => {
    const input = {key1: 'value1', key2: 'value2'};
    const expected = [{key: 'key1', value: 'value1'}, {key: 'key2', value: 'value2'}];
    const actual = pipe.transform(input);
    expect(actual).toEqual(expected);
  });
});

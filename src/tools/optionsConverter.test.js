import { convertOptions } from './optionsConverter';
describe('optionsConverter', () => {
  it('should do sanity check', () => {
    expect(1).toBe(1);
  });

  it('should convert data properly', () => {
    const text = 'Alabama|3\nAlaska|2\nCalifornia|6';

    expect(convertOptions(text)).toEqual([
      { label: 'Alabama', value: '3' },
      { label: 'Alaska', value: '2' },
      { label: 'California', value: '6' },
    ]);
  });
});

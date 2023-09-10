import { numberValidator } from './number.directive';
import { FormControl } from '@angular/forms';

describe('numberValidator', () => {
  const validNumberRegex = /^(?!0\d)\d+(\.\d+)?$/;

  it('should return null for a valid number greater than zero', () => {
    const validator = numberValidator(validNumberRegex);
    const control = new FormControl('42.5');
    const result = validator(control);

    expect(result).toBeNull();
  });

  it('should return null for an integer greater than zero', () => {
    const validator = numberValidator(validNumberRegex);
    const control = new FormControl('100');
    const result = validator(control);

    expect(result).toBeNull();
  });

  it('should return null for zero', () => {
    const validator = numberValidator(validNumberRegex);
    const control = new FormControl('0');
    const result = validator(control);

    expect(result).toBeNull();
  });

  it('should return an error for a non-number string', () => {
    const validator = numberValidator(validNumberRegex);
    const control = new FormControl('abc');
    const result = validator(control);

    expect(result).toEqual({ 'Needs to be a number greater than zero': { value: 'abc' } });
  });

  it('should return an error for a negative number', () => {
    const validator = numberValidator(validNumberRegex);
    const control = new FormControl('-10');
    const result = validator(control);

    expect(result).toEqual({ 'Needs to be a number greater than zero': { value: '-10' } });
  });

  it('should return an error for a valid number less than zero', () => {
    const validator = numberValidator(validNumberRegex);
    const control = new FormControl('-5.5');
    const result = validator(control);

    expect(result).toEqual({ 'Needs to be a number greater than zero': { value: '-5.5' } });
  });
});

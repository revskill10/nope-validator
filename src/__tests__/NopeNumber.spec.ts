import Nope from '..';

describe('#NopeNumber', () => {
  describe('[transformers]', () => {
    it('[round] should round(floor) the number', () => {
      const schema = Nope.number().round('floor');

      for (const { value, expected } of [
        { value: 10, expected: 10 },
        { value: 10.5, expected: 10 },
        { value: 10.4, expected: 10 },
        { value: 10.55, expected: 10 },
        { value: 45.95, expected: 45 },
        { value: -45.95, expected: -46 },
      ]) {
        const { data, transformed, errors } = schema.validate(value);
        expect(data).toBe(value);
        expect(transformed).toBe(expected);
        expect(errors).toHaveLength(0);
      }
    });

    it('[round] should round(ceil) the number', () => {
      const schema = Nope.number().round('ceil');

      for (const { value, expected } of [
        { value: 10, expected: 10 },
        { value: 10.5, expected: 11 },
        { value: 10.4, expected: 11 },
        { value: 10.55, expected: 11 },
        { value: 45.95, expected: 46 },
        { value: -45.95, expected: -45 },
      ]) {
        const { data, transformed, errors } = schema.validate(value);
        expect(data).toBe(value);
        expect(transformed).toBe(expected);
        expect(errors).toHaveLength(0);
      }
    });

    it('[round] should round(trunc) the number', () => {
      const schema = Nope.number().round('trunc');

      for (const { value, expected } of [
        { value: 10, expected: 10 },
        { value: 10.5, expected: 10 },
        { value: 10.4, expected: 10 },
        { value: 10.55, expected: 10 },
        { value: 45.95, expected: 45 },
        { value: -45.95, expected: -45 },
      ]) {
        const { data, transformed, errors } = schema.validate(value);
        expect(data).toBe(value);
        expect(transformed).toBe(expected);
        expect(errors).toHaveLength(0);
      }
    });

    it('[round] should round(round) the number', () => {
      const schema = Nope.number().round('round');

      for (const { value, expected } of [
        { value: 10, expected: 10 },
        { value: 10.5, expected: 11 },
        { value: 10.4, expected: 10 },
        { value: 10.55, expected: 11 },
        { value: 45.95, expected: 46 },
        { value: -45.95, expected: -46 },
      ]) {
        const { data, transformed, errors } = schema.validate(value);
        expect(data).toBe(value);
        expect(transformed).toBe(expected);
        expect(errors).toHaveLength(0);
      }
    });
  });

  describe('[hooks]', () => {
    it('[min] (alias for greaterThan) should return an empty errors array for an empty entry', () => {
      const schema = Nope.number().min(3, 'min-length-error-message');
      const { data, transformed, errors } = schema.validate(undefined);
      expect(data).toBeUndefined();
      expect(transformed).toBeUndefined();
      expect(errors).toHaveLength(0);
    });

    it('[min] (alias for greaterThan) should return an error message for an entry smaller than the threshold', () => {
      const schema = Nope.number().min(5, 'min-length-error-message');
      const { data, transformed, errors } = schema.validate(2);
      expect(data).toBe(2);
      expect(transformed).toBe(2);
      expect(errors).toHaveLength(1);
      expect(errors[0]).toBe('min-length-error-message');
    });

    it('[min] (alias for greaterThan) should return an error message for an entry equal to the threshold', () => {
      const schema = Nope.number().min(3);
      const { data, transformed, errors } = schema.validate(3);
      expect(data).toBe(3);
      expect(transformed).toBe(3);
      expect(errors).toHaveLength(1);
      expect(errors[0]).toBe('Input is too small');
    });

    it('[min] (alias for greaterThan) should return an empty errors array for an entry greater than the threshold', () => {
      const schema = Nope.number().min(5, 'min-length-error-message');
      const { data, transformed, errors } = schema.validate(6);
      expect(data).toBe(6);
      expect(transformed).toBe(6);
      expect(errors).toHaveLength(0);
    });

    it('[max] (alias for lessThan) should return an empty errors array for an empty entry', () => {
      const schema = Nope.number().max(5, 'max-length-error-message');
      const { data, transformed, errors } = schema.validate(undefined);
      expect(data).toBeUndefined();
      expect(transformed).toBeUndefined();
      expect(errors).toHaveLength(0);
    });

    it('[max] (alias for lessThan) should return an error message for an entry greater than the threshold', () => {
      const schema = Nope.number().max(5, 'max-length-error-message');
      const { data, transformed, errors } = schema.validate(7);
      expect(data).toBe(7);
      expect(transformed).toBe(7);
      expect(errors).toHaveLength(1);
      expect(errors[0]).toBe('max-length-error-message');
    });

    it('[max] (alias for lessThan) should return an error message for an entry equal to the threshold', () => {
      const schema = Nope.number().max(4);
      const { data, transformed, errors } = schema.validate(4);
      expect(data).toBe(4);
      expect(transformed).toBe(4);
      expect(errors).toHaveLength(1);
      expect(errors[0]).toBe('Input is too large');
    });

    it('[max] (alias for lessThan) should return an empty errors array for an entry smaller than the threshold', () => {
      const schema = Nope.number().max(5);
      const { data, transformed, errors } = schema.validate(2);
      expect(data).toBe(2);
      expect(transformed).toBe(2);
      expect(errors).toHaveLength(0);
    });

    it('[greaterThan] should return an empty errors array for an empty entry', () => {
      const schema = Nope.number().greaterThan(5, 'greater-than-error-message');
      const { data, transformed, errors } = schema.validate(undefined);
      expect(data).toBeUndefined();
      expect(transformed).toBeUndefined();
      expect(errors).toHaveLength(0);
    });

    it('[greaterThan] should return an error message for an entry smaller than the threshold', () => {
      const schema = Nope.number().greaterThan(5, 'greater-than-error-message');
      const { data, transformed, errors } = schema.validate(2);
      expect(data).toBe(2);
      expect(transformed).toBe(2);
      expect(errors).toHaveLength(1);
      expect(errors[0]).toBe('greater-than-error-message');
    });

    it('[greaterThan] should return an error message for an entry equal to the threshold', () => {
      const schema = Nope.number().greaterThan(3);
      const { data, transformed, errors } = schema.validate(3);
      expect(data).toBe(3);
      expect(transformed).toBe(3);
      expect(errors).toHaveLength(1);
      expect(errors[0]).toBe('Input is too small');
    });

    it('[greaterThan] should return an empty errors array for an entry greater than the threshold', () => {
      const schema = Nope.number().greaterThan(5, 'greater-than-error-message');
      const { data, transformed, errors } = schema.validate(6);
      expect(data).toBe(6);
      expect(transformed).toBe(6);
      expect(errors).toHaveLength(0);
    });

    it('[lessThan] should return an empty errors array for an empty entry', () => {
      const schema = Nope.number().lessThan(5, 'less-than-error-message');
      const { data, transformed, errors } = schema.validate(undefined);
      expect(data).toBeUndefined();
      expect(transformed).toBeUndefined();
      expect(errors).toHaveLength(0);
    });

    it('[lessThan] should return an error message for an entry greater than the threshold', () => {
      const schema = Nope.number().lessThan(5, 'less-than-error-message');
      const { data, transformed, errors } = schema.validate(7);
      expect(data).toBe(7);
      expect(transformed).toBe(7);
      expect(errors).toHaveLength(1);
      expect(errors[0]).toBe('less-than-error-message');
    });

    it('[lessThan] should return an error message for an entry equal to the threshold', () => {
      const schema = Nope.number().lessThan(4);
      const { data, transformed, errors } = schema.validate(6);
      expect(data).toBe(6);
      expect(transformed).toBe(6);
      expect(errors).toHaveLength(1);
      expect(errors[0]).toBe('Input is too large');
    });

    it('[lessThan] should return an empty errors array for an entry smaller than the threshold', () => {
      const schema = Nope.number().lessThan(5);
      const { data, transformed, errors } = schema.validate(2);
      expect(data).toBe(2);
      expect(transformed).toBe(2);
      expect(errors).toHaveLength(0);
    });

    it('[atLeast] should return an empty errors array for an empty entry', () => {
      const schema = Nope.number().atLeast(5, 'at-least-error-message');
      const { data, transformed, errors } = schema.validate(undefined);
      expect(data).toBeUndefined();
      expect(transformed).toBeUndefined();
      expect(errors).toHaveLength(0);
    });

    it('[atLeast] should return an error message for an entry smaller than the the threshold', () => {
      const schema = Nope.number().atLeast(5, 'at-least-error-message');
      const { data, transformed, errors } = schema.validate(2);
      expect(data).toBe(2);
      expect(transformed).toBe(2);
      expect(errors).toHaveLength(1);
      expect(errors[0]).toBe('at-least-error-message');
    });

    it('[atLeast] should return an empty errors array for an entry equal to the threshold', () => {
      const schema = Nope.number().atLeast(3);
      const { data, transformed, errors } = schema.validate(3);
      expect(data).toBe(3);
      expect(transformed).toBe(3);
      expect(errors).toHaveLength(0);
    });

    it('[atLeast] should return an empty errors array for an entry greater than the threshold', () => {
      const schema = Nope.number().atLeast(5, 'at-least-error-message');
      const { data, transformed, errors } = schema.validate(6);
      expect(data).toBe(6);
      expect(transformed).toBe(6);
      expect(errors).toHaveLength(0);
    });

    it('[atMost] should return an empty errors array for an empty entry', () => {
      const schema = Nope.number().atMost(5, 'at-most-error-message');
      const { data, transformed, errors } = schema.validate(undefined);
      expect(data).toBeUndefined();
      expect(transformed).toBeUndefined();
      expect(errors).toHaveLength(0);
    });

    it('[atMost] should return an error message for an entry greater than the theshold', () => {
      const schema = Nope.number().atMost(5, 'at-most-error-message');
      const { data, transformed, errors } = schema.validate(7);
      expect(data).toBe(7);
      expect(transformed).toBe(7);
      expect(errors).toHaveLength(1);
      expect(errors[0]).toBe('at-most-error-message');
    });

    it('[atMost] should return an empty errors array for an entry equal to the threshold', () => {
      const schema = Nope.number().atMost(10);
      const { data, transformed, errors } = schema.validate(10);
      expect(data).toBe(10);
      expect(transformed).toBe(10);
      expect(errors).toHaveLength(0);
    });

    it('[atMost] should return an empty errors array for an entry smaller than the threshold', () => {
      const schema = Nope.number().atMost(5);
      const { data, transformed, errors } = schema.validate(2);
      expect(data).toBe(2);
      expect(transformed).toBe(2);
      expect(errors).toHaveLength(0);
    });

    it('[between] should return an error message for an entry smaller than the the threshold', () => {
      const schema = Nope.number().between(5, 10, 'between-error-message');
      const { data, transformed, errors } = schema.validate(2);
      expect(data).toBe(2);
      expect(transformed).toBe(2);
      expect(errors).toHaveLength(1);
      expect(errors[0]).toBe('between-error-message');
    });

    it('[between] should return an empty errors array for an entry equal (startSize) to the threshold', () => {
      const schema = Nope.number().between(3, 10, 'between-error-message');
      const { data, transformed, errors } = schema.validate(3);
      expect(data).toBe(3);
      expect(transformed).toBe(3);
      expect(errors).toHaveLength(0);
    });

    it('[between] should return an error message for an entry greater than the theshold', () => {
      const schema = Nope.number().between(
        5,
        6,
        'too-small-error-message',
        'too-large-error-message',
      );
      const { data, transformed, errors } = schema.validate(7);
      expect(data).toBe(7);
      expect(transformed).toBe(7);
      expect(errors).toHaveLength(1);
      expect(errors[0]).toBe('too-large-error-message');
    });

    it('[between] should return an empty errors array for an entry equal (endSize) to the threshold', () => {
      const schema = Nope.number().between(10, 15, 'between-error-message');
      const { data, transformed, errors } = schema.validate(10);
      expect(data).toBe(10);
      expect(transformed).toBe(10);
      expect(errors).toHaveLength(0);
    });

    it('[between] should return an empty errors array for an empty entry', () => {
      const schema = Nope.number().between(
        5,
        10,
        'at-least-error-message',
        'at-most-error-message',
      );
      const { data, transformed, errors } = schema.validate(undefined);
      expect(data).toBeUndefined();
      expect(transformed).toBeUndefined();
      expect(errors).toHaveLength(0);
    });

    it('[between] should throw an error if used wrongly', () => {
      const schema = Nope.number().between(5, 1);
      expect(() => schema.validate(2)).toThrowError(
        'between must receive an initial size (sizeStart) smaller than the final size (sizeEnd) parameter',
      );
    });

    it('[positive] should return an empty errors array for an empty entry', () => {
      const schema = Nope.number().positive();
      const { data, transformed, errors } = schema.validate(undefined);
      expect(data).toBeUndefined();
      expect(transformed).toBeUndefined();
      expect(errors).toHaveLength(0);
    });

    it('[positive] should return an error message for an entry negative', () => {
      const schema = Nope.number().positive('must-be-positive');
      const { data, transformed, errors } = schema.validate(-1);
      expect(data).toBe(-1);
      expect(transformed).toBe(-1);
      expect(errors).toHaveLength(1);
      expect(errors[0]).toBe('must-be-positive');
    });

    it('[positive] should return an empty errors array for an entry positive', () => {
      const schema = Nope.number().positive('positive-error-message');
      const { data, transformed, errors } = schema.validate(2);
      expect(data).toBe(2);
      expect(transformed).toBe(2);
      expect(errors).toHaveLength(0);
    });

    it('[negative] should return an empty errors array for an empty entry', () => {
      const schema = Nope.number().negative();
      const { data, transformed, errors } = schema.validate(undefined);
      expect(data).toBeUndefined();
      expect(transformed).toBeUndefined();
      expect(errors).toHaveLength(0);
    });

    it('[negative] should return an error message for an entry negative', () => {
      const schema = Nope.number().negative('must-be-negative');
      const { data, transformed, errors } = schema.validate(1);
      expect(data).toBe(1);
      expect(transformed).toBe(1);
      expect(errors).toHaveLength(1);
      expect(errors[0]).toBe('must-be-negative');
    });

    it('[negative] should return an empty errors array for an entry negative', () => {
      const schema = Nope.number().negative('negative-error-message');
      const { data, transformed, errors } = schema.validate(-1);
      expect(data).toBe(-1);
      expect(transformed).toBe(-1);
      expect(errors).toHaveLength(0);
    });

    it('[integer] should return an empty errors array for an empty entry', () => {
      const schema = Nope.number().integer();
      const { data, transformed, errors } = schema.validate(undefined);
      expect(data).toBeUndefined();
      expect(transformed).toBeUndefined();
      expect(errors).toHaveLength(0);
    });

    it('[integer] should return an error message for an entry not an integer', () => {
      const schema = Nope.number().integer('must-be-integer');
      const { data, transformed, errors } = schema.validate(3.14);
      expect(data).toBe(3.14);
      expect(transformed).toBe(3.14);
      expect(errors).toHaveLength(1);
      expect(errors[0]).toBe('must-be-integer');
    });

    it('[integer] should return an empty errors array for an entry an integer', () => {
      const schema = Nope.number().integer('integer-error-message');
      const { data, transformed, errors } = schema.validate(1);
      expect(data).toBe(1);
      expect(transformed).toBe(1);
      expect(errors).toHaveLength(0);
    });

    it('[integer] should throw an error for an entry not an integer', () => {
      const schema = Nope.number().integer();

      expect(() => schema.validate('one')).toThrowError('The entry is not a valid number');
    });

    it('[required] should return an error message for undefined entry', () => {
      const schema = Nope.number().required('required-error-message');
      const { data, transformed, errors } = schema.validate(undefined);
      expect(data).toBeUndefined();
      expect(transformed).toBeUndefined();
      expect(errors).toHaveLength(1);
      expect(errors[0]).toBe('required-error-message');
    });

    it('[required] should return an error message for null entry', () => {
      const schema = Nope.number().required();
      const { data, transformed, errors } = schema.validate(null);
      expect(data).toBe(null);
      expect(transformed).toBe(null);
      expect(errors).toHaveLength(1);
      expect(errors[0]).toBe('This field is required');
    });

    it('[required] should return an error message for empty entry', () => {
      const schema = Nope.number().required('required-error-message');
      const { data, transformed, errors } = schema.validate('');
      expect(data).toBe('');
      expect(transformed).toBe('');
      expect(errors).toHaveLength(1);
      expect(errors[0]).toBe('required-error-message');
    });
  });
});

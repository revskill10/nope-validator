import Nope from '..';

describe('#NopeDate', () => {
  describe.only('[hooks]', () => {
    it('[before] should return an empty errors array for an empty entry', () => {
      const schema = Nope.date().before('2019-01-01');
      const { data, transformed, errors } = schema.validate(undefined);
      expect(data).toBeUndefined();
      expect(transformed).toBeUndefined();
      expect(errors).toHaveLength(0);
    });

    it('[before] should return an error message for an invalid entry', () => {
      const schema = Nope.date().before('2019-01-01', 'before-error-message');
      const { data, transformed, errors } = schema.validate('2019-01-02');
      expect(data).toStrictEqual('2019-01-02');
      expect(transformed).toStrictEqual(new Date('2019-01-02'));
      expect(errors).toHaveLength(1);
      expect(errors[0]).toBe('before-error-message');
    });

    it('[before] should return an empty errors array for a valid entry', () => {
      const schema = Nope.date().before('2019-01-02');
      const { data, transformed, errors } = schema.validate('2019-01-01');
      expect(data).toStrictEqual('2019-01-01');
      expect(transformed).toStrictEqual(new Date('2019-01-01'));
      expect(errors).toHaveLength(0);
    });

    it('[before] should throw an error for an invalid date', () => {
      const schema = Nope.date().before('2019-01-01');
      expect(schema.validate('not a date')).toMatch('The entry is not a valid date');
    });

    it('[before] should return a defined error message for an invalid date', () => {
      const schema = Nope.date('date-error-custom-message').before('2019-01-02', 'before-error');
      expect(schema.validate('not a date')).toMatch('date-error-custom-message');
    });

    it('[after] should return an empty errors array for an empty entry', () => {
      const schema = Nope.date().after('2019-01-01');
      const { data, transformed, errors } = schema.validate(undefined);
      expect(data).toBeUndefined();
      expect(transformed).toBeUndefined();
      expect(errors).toHaveLength(0);
    });

    it('[after] should return an error message for an invalid entry', () => {
      const schema = Nope.date().after('2019-01-02', 'after-error-message');
      const { data, transformed, errors } = schema.validate('2019-01-01');
      expect(data).toStrictEqual('2019-01-01');
      expect(transformed).toStrictEqual(new Date('2019-01-01'));
      expect(errors).toHaveLength(1);
      expect(errors[0]).toBe('after-error-message');
    });

    it('[after] should return an empty errors array for a valid entry', () => {
      const schema = Nope.date().after('2019-01-01');
      const { data, transformed, errors } = schema.validate('2019-01-02');
      expect(data).toStrictEqual('2019-01-02');
      expect(transformed).toStrictEqual(new Date('2019-01-02'));
      expect(errors).toHaveLength(0);
    });

    it('[after] should throw an error for an invalid date', () => {
      const schema = Nope.date().after('2019-01-01');
      expect(schema.validate('not a date')).toMatch('The entry is not a valid date');
    });

    it('[after] should return a defined error message for an invalid date', () => {
      const schema = Nope.date('date-error-custom-message').after('2019-01-02', 'after-error');
      expect(schema.validate('not a date')).toMatch('date-error-custom-message');
    });
  });
});

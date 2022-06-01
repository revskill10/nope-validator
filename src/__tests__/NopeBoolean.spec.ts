import Nope from '..';

describe('#NopeBoolean', () => {
  describe('[hooks]', () => {
    it('[true] should return an empty errors array for an empty entry', () => {
      const schema = Nope.boolean().true();
      const { data, transformed, errors } = schema.validate(undefined);
      expect(data).toBeUndefined();
      expect(transformed).toBeUndefined();
      expect(errors).toHaveLength(0);
    });

    it('[true] should return an error message for a false entry', () => {
      const schema = Nope.boolean().true('true-error-message');
      const { data, transformed, errors } = schema.validate(false);
      expect(data).toBe(false);
      expect(transformed).toBe(false);
      expect(errors).toHaveLength(1);
      expect(errors[0]).toBe('true-error-message');
    });

    it('[true] should return an empty errors array for a true entry', () => {
      const schema = Nope.boolean().true('true-error-message');
      const { data, transformed, errors } = schema.validate(true);
      expect(data).toBe(true);
      expect(transformed).toBe(true);
      expect(errors).toHaveLength(0);
    });

    it('[false] should return an empty errors array for an empty entry', () => {
      const schema = Nope.boolean().false();
      const { data, transformed, errors } = schema.validate(undefined);
      expect(data).toBeUndefined();
      expect(transformed).toBeUndefined();
      expect(errors).toHaveLength(0);
    });

    it('[false] should return an error message for a true entry', () => {
      const schema = Nope.boolean().false('false-error-message');
      const { data, transformed, errors } = schema.validate(true);
      expect(data).toBe(true);
      expect(transformed).toBe(true);
      expect(errors).toHaveLength(1);
      expect(errors[0]).toBe('false-error-message');
    });

    it('[false] should return an empty errors array for a false entry', () => {
      const schema = Nope.boolean().false('false-error-message');
      const { data, transformed, errors } = schema.validate(false);
      expect(data).toBe(false);
      expect(transformed).toBe(false);
      expect(errors).toHaveLength(0);
    });
  });
});

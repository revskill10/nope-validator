import Nope from '..';

describe('#NopeString', () => {
  describe('[transformers]', () => {
    it('[trim] should remove the whitespaces around the entry', () => {
      const schema = Nope.string().trim();
      const { data, transformed, errors } = schema.validate('  hello  ');
      expect(data).toBe('  hello  ');
      expect(transformed).toBe('hello');
      expect(errors).toHaveLength(0);
    });

    it('[toLowerCase] should convert the entry to lowercase', () => {
      const schema = Nope.string().toLowerCase();
      const { data, transformed, errors } = schema.validate('NOPE-validation');
      expect(data).toBe('NOPE-validation');
      expect(transformed).toBe('nope-validation');
      expect(errors).toHaveLength(0);
    });

    it('[toUpperCase] should convert the entry to uppercase', () => {
      const schema = Nope.string().toUpperCase();
      const { data, transformed, errors } = schema.validate('NOPE-validation');
      expect(data).toBe('NOPE-validation');
      expect(transformed).toBe('NOPE-VALIDATION');
      expect(errors).toHaveLength(0);
    });

    it('[trim] and [toLowerCase] should work together', () => {
      const schema = Nope.string().trim().toLowerCase();
      const { data, transformed, errors } = schema.validate('  NOPE-validation  ');
      expect(data).toBe('  NOPE-validation  ');
      expect(transformed).toBe('nope-validation');
      expect(errors).toHaveLength(0);
    });

    it('[trim] and [toUpperCase] should work together', () => {
      const schema = Nope.string().trim().toUpperCase();
      const { data, transformed, errors } = schema.validate('  NOPE-validation  ');
      expect(data).toBe('  NOPE-validation  ');
      expect(transformed).toBe('NOPE-VALIDATION');
      expect(errors).toHaveLength(0);
    });

    it('[toLowerCase] and [toUpperCase] should work together (last transform method called will replace the first)', () => {
      const schema = Nope.string().toLowerCase().toUpperCase();
      const { data, transformed, errors } = schema.validate('  NOPE-validation  ');
      expect(data).toBe('  NOPE-validation  ');
      expect(transformed).toBe('  NOPE-VALIDATION  ');
      expect(errors).toHaveLength(0);
    });
  });

  describe('[hooks]', () => {
    it('[regex] should return an error message for an invalid entry', async () => {
      const schema = Nope.string().regex(/abc/i, 'regex-error-message');
      const { data, transformed, errors } = schema.validate('xyz');
      expect(data).toBe('xyz');
      expect(transformed).toBe('xyz');
      expect(errors).toHaveLength(1);
      expect(errors[0]).toBe('regex-error-message');
    });

    it('[regex] should return an empty errors array for an empty entry', () => {
      const schema = Nope.string().regex(/abc/i, 'regex-error-message');
      const { data, transformed, errors } = schema.validate('');
      expect(data).toBe('');
      expect(transformed).toBe('');
      expect(errors).toHaveLength(0);
    });

    it('[regex] should return an empty errors array for an valid entry', () => {
      const schema = Nope.string().regex(/abc/i);
      const { data, transformed, errors } = schema.validate('abc');
      expect(data).toBe('abc');
      expect(transformed).toBe('abc');
      expect(errors).toHaveLength(0);
    });

    it('[url] should return an empty errors array for an empty entry', () => {
      const schema = Nope.string().url('url-error-message');
      const { data, transformed, errors } = schema.validate('');
      expect(data).toBe('');
      expect(transformed).toBe('');
      expect(errors).toHaveLength(0);
    });

    it('[url] should return an error message for an invalid URL', () => {
      const invalidUrls = ['http://:google.com', 'http://', 'http://foo.bar/foo(bar)baz quux'];
      const schema = Nope.string().url('url-error-message');

      for (const url of invalidUrls) {
        const { data, transformed, errors } = schema.validate(url);
        expect(data).toBe(url);
        expect(transformed).toBe(url);
        expect(errors).toHaveLength(1);
        expect(errors[0]).toBe('url-error-message');
      }

      const { data, transformed, errors } = Nope.string().url().validate('&&');
      expect(data).toBe('&&');
      expect(transformed).toBe('&&');
      expect(errors).toHaveLength(1);
      expect(errors[0]).toBe('Input is not a valid url');
    });

    it('[url] should return an empty errors array for a valid URL', () => {
      const validUrls = [
        'https://github.com/bvego/nope-validator/commit/4564b7444dcd92769e5c5b80420469c9f18b7a05?branch=4564b7444dcd92769e5c5b80420469c9f18b7a05&diff=split',
        'https://google.com',
        'https://google.com?asd=123',
        'https://google.com/123',
        'https://google.com/123/456?q=42',
      ];
      const schema = Nope.string().url('url-error-message');

      for (const url of validUrls) {
        const { data, transformed, errors } = schema.validate(url);
        expect(data).toBe(url);
        expect(transformed).toBe(url);
        expect(errors).toHaveLength(0);
      }
    });

    it('[email] should return an empty errors array for an empty entry', () => {
      const schema = Nope.string().email('email-error-message');
      const { data, transformed, errors } = schema.validate('');
      expect(data).toBe('');
      expect(transformed).toBe('');
      expect(errors).toHaveLength(0);
    });

    it('[email] should return an error message for an invalid email', () => {
      const ERR_MSG = 'email-error-message';
      const schema = Nope.string().email(ERR_MSG);

      for (const mail of ['bruno.vegogmail.com', 'bruno.vego.gmail.com', 'bruno.vego@gmail.com@']) {
        const { data, transformed, errors } = schema.validate(mail);
        expect(data).toBe(mail);
        expect(transformed).toBe(mail);
        expect(errors).toHaveLength(1);
        expect(errors[0]).toBe(ERR_MSG);
      }

      const { data, transformed, errors } = Nope.string().email().validate('&&');
      expect(data).toBe('&&');
      expect(transformed).toBe('&&');
      expect(errors).toHaveLength(1);
      expect(errors[0]).toBe('Input is not a valid email');
    });

    it('[email] should return an empty errors array for a valid email', () => {
      const ERR_MSG = 'email-error-message';
      const schema = Nope.string().email(ERR_MSG);

      for (const mail of [
        'bruno.vego@gmail.com',
        'random-guy@google.com',
        'random-guy+test@google.com',
      ]) {
        const { data, transformed, errors } = schema.validate(mail);
        expect(data).toBe(mail);
        expect(transformed).toBe(mail);
        expect(errors).toHaveLength(0);
      }
    });

    it('[min] (alias for greaterThan) should return an empty errors array for an empty entry', () => {
      const schema = Nope.string().min(5, 'min-length-error-message');
      const { data, transformed, errors } = schema.validate('');
      expect(data).toBe('');
      expect(transformed).toBe('');
      expect(errors).toHaveLength(0);
    });

    it('[min] (alias for greaterThan) should return an error message for an entry shorter than the the threshold', () => {
      const schema = Nope.string().min(5, 'min-length-error-message');
      const { data, transformed, errors } = schema.validate('abc');
      expect(data).toBe('abc');
      expect(transformed).toBe('abc');
      expect(errors).toHaveLength(1);
      expect(errors[0]).toBe('min-length-error-message');
    });

    it('[min] (alias for greaterThan) should return an error message for an entry shorter than the the threshold', () => {
      const schema = Nope.string().min(5, 'min-length-error-message');
      const { data, transformed, errors } = schema.validate('abc');
      expect(data).toBe('abc');
      expect(transformed).toBe('abc');
      expect(errors).toHaveLength(1);
      expect(errors[0]).toBe('min-length-error-message');
    });

    it('[min] (alias for greaterThan) should return an error message for an entry equal to the threshold', () => {
      const schema = Nope.string().min(4);
      const { data, transformed, errors } = schema.validate('abcd');
      expect(data).toBe('abcd');
      expect(transformed).toBe('abcd');
      expect(errors).toHaveLength(1);
      expect(errors[0]).toBe('Input is too short');
    });

    it('[min] (alias for greaterThan) should return an empty errors array for an entry longer than the threshold', () => {
      const schema = Nope.string().min(5, 'minLengthErrorMessage');
      const { data, transformed, errors } = schema.validate('ftonato');
      expect(data).toBe('ftonato');
      expect(transformed).toBe('ftonato');
      expect(errors).toHaveLength(0);
    });

    it('[max] (alias for lessThan) should return an empty errors array for an empty entry', () => {
      const schema = Nope.string().max(5, 'max-length-error-message');
      const { data, transformed, errors } = schema.validate('');
      expect(data).toBe('');
      expect(transformed).toBe('');
      expect(errors).toHaveLength(0);
    });

    it('[max] (alias for lessThan) should return an error message for an entry longer than the the threshold', () => {
      const schema = Nope.string().max(5);
      const { data, transformed, errors } = schema.validate('magicalmystery');
      expect(data).toBe('magicalmystery');
      expect(transformed).toBe('magicalmystery');
      expect(errors).toHaveLength(1);
      expect(errors[0]).toBe('Input is too long');
    });

    it('[max] (alias for lessThan) should return an error message for an entry equal to the threshold', () => {
      const schema = Nope.string().max(14);
      const { data, transformed, errors } = schema.validate('magicalmystery');
      expect(data).toBe('magicalmystery');
      expect(transformed).toBe('magicalmystery');
      expect(errors).toHaveLength(1);
      expect(errors[0]).toBe('Input is too long');
    });

    it('[max] (alias for lessThan) should return an empty errors array for an entry shorter than threshold', () => {
      const schema = Nope.string().max(5, 'maxLengthErrorMessage');
      const { data, transformed, errors } = schema.validate('tour');
      expect(data).toBe('tour');
      expect(transformed).toBe('tour');
      expect(errors).toHaveLength(0);
    });

    it('[greaterThan] should return an empty errors array for an empty entry', async () => {
      const schema = Nope.string().greaterThan(5, 'greater-than--error-message');
      const { data, transformed, errors } = schema.validate('');
      expect(data).toBe('');
      expect(transformed).toBe('');
      expect(errors).toHaveLength(0);
    });

    it('[greaterThan] should return an error message for an entry shorter than the threshold', () => {
      const schema = Nope.string().greaterThan(5);
      const { data, transformed, errors } = schema.validate('tour');
      expect(data).toBe('tour');
      expect(transformed).toBe('tour');
      expect(errors).toHaveLength(1);
      expect(errors[0]).toBe('Input is too short');
    });

    it('[greaterThan] should return an error message for an entry equal to the threshold', () => {
      const schema = Nope.string().greaterThan(4);
      const { data, transformed, errors } = schema.validate('tour');
      expect(data).toBe('tour');
      expect(transformed).toBe('tour');
      expect(errors).toHaveLength(1);
      expect(errors[0]).toBe('Input is too short');
    });

    it('[greaterThan] should return an empty errors array for an entry longer than the threshold', () => {
      const schema = Nope.string().greaterThan(5, 'greaterThanErrorMessage');
      const { data, transformed, errors } = schema.validate('magicalmystery');
      expect(data).toBe('magicalmystery');
      expect(transformed).toBe('magicalmystery');
      expect(errors).toHaveLength(0);
    });

    it('[lessThan] should return an empty errors array for an empty entry', () => {
      const schema = Nope.string().lessThan(5, 'less-than--error-message');
      const { data, transformed, errors } = schema.validate('');
      expect(data).toBe('');
      expect(transformed).toBe('');
      expect(errors).toHaveLength(0);
    });

    it('[lessThan] should return an error message for an entry longer than the threshold', () => {
      const schema = Nope.string().lessThan(5);
      const { data, transformed, errors } = schema.validate('magicalmystery');
      expect(data).toBe('magicalmystery');
      expect(transformed).toBe('magicalmystery');
      expect(errors).toHaveLength(1);
      expect(errors[0]).toBe('Input is too long');
    });

    it('[lessThan] should return an error message for an entry equal to the threshold', () => {
      const schema = Nope.string().lessThan(14);
      const { data, transformed, errors } = schema.validate('magicalmystery');
      expect(data).toBe('magicalmystery');
      expect(transformed).toBe('magicalmystery');
      expect(errors).toHaveLength(1);
      expect(errors[0]).toBe('Input is too long');
    });

    it('[lessThan] should return an empty errors array for an entry shorter than threshold', () => {
      const schema = Nope.string().lessThan(5, 'lessThanErrorMessage');
      const { data, transformed, errors } = schema.validate('tour');
      expect(data).toBe('tour');
      expect(transformed).toBe('tour');
      expect(errors).toHaveLength(0);
    });

    it('[atLeast] should return an empty errors array for an empty entry', () => {
      const schema = Nope.string().atLeast(5, 'at-least-error-message');
      const { data, transformed, errors } = schema.validate('');
      expect(data).toBe('');
      expect(transformed).toBe('');
      expect(errors).toHaveLength(0);
    });

    it('[atLeast] should return an error message for an entry shorter than the threshold', () => {
      const schema = Nope.string().atLeast(5);
      const { data, transformed, errors } = schema.validate('tour');
      expect(data).toBe('tour');
      expect(transformed).toBe('tour');
      expect(errors).toHaveLength(1);
      expect(errors[0]).toBe('Input is too short');
    });

    it('[atLeast] should return an empty errors array for an entry equal to the threshold', () => {
      const schema = Nope.string().atLeast(4, 'atLeastErrorMessage');
      const { data, transformed, errors } = schema.validate('tour');
      expect(data).toBe('tour');
      expect(transformed).toBe('tour');
      expect(errors).toHaveLength(0);
    });

    it('[atLeast] should return an empty errors array for an entry longer than the threshold', () => {
      const schema = Nope.string().atLeast(5, 'atLeastErrorMessage');
      const { data, transformed, errors } = schema.validate('magicalmystery');
      expect(data).toBe('magicalmystery');
      expect(transformed).toBe('magicalmystery');
      expect(errors).toHaveLength(0);
    });

    it('[atMost] should return an empty errors array for an empty entry', () => {
      const schema = Nope.string().atMost(5, 'at-most-error-message');
      const { data, transformed, errors } = schema.validate('');
      expect(data).toBe('');
      expect(transformed).toBe('');
      expect(errors).toHaveLength(0);
    });

    it('[atMost] should return an error message for an entry longer than the threshold', async () => {
      const schema = Nope.string().atMost(5);
      const { data, transformed, errors } = schema.validate('magicalmystery');
      expect(data).toBe('magicalmystery');
      expect(transformed).toBe('magicalmystery');
      expect(errors).toHaveLength(1);
      expect(errors[0]).toBe('Input is too long');
    });

    it('[atMost] should return an empty errors array for an entry equal to the threshold', () => {
      const schema = Nope.string().atMost(4, 'atMostErrorMessage');
      const { data, transformed, errors } = schema.validate('tour');
      expect(data).toBe('tour');
      expect(transformed).toBe('tour');
      expect(errors).toHaveLength(0);
    });

    it('[atMost] should return an empty errors array for an entry shorter than threshold', () => {
      const schema = Nope.string().atMost(5, 'atMostErrorMessage');
      const { data, transformed, errors } = schema.validate('tour');
      expect(data).toBe('tour');
      expect(transformed).toBe('tour');
      expect(errors).toHaveLength(0);
    });

    it('[between] should return an empty errors array for an empty entry', () => {
      const schema = Nope.string().between(
        5,
        10,
        'at-least-error-message',
        'at-most-error-message',
      );
      const { data, transformed, errors } = schema.validate('');
      expect(data).toBe('');
      expect(transformed).toBe('');
      expect(errors).toHaveLength(0);
    });

    it('[between] should return an error message for an entry shorter than the threshold', () => {
      const schema = Nope.string().between(5, 10);
      const { data, transformed, errors } = schema.validate('tour');
      expect(data).toBe('tour');
      expect(transformed).toBe('tour');
      expect(errors).toHaveLength(1);
      expect(errors[0]).toBe('Input is too short');
    });

    it('[between] should return undefined for an entry equal (startLength) to the threshold', () => {
      const schema = Nope.string().between(4, 10);
      const { data, transformed, errors } = schema.validate('tour');
      expect(data).toBe('tour');
      expect(transformed).toBe('tour');
      expect(errors).toHaveLength(0);
    });

    it('[between] should return undefined for an entry equal (endLength) to the threshold', () => {
      const schema = Nope.string().between(4, 10);
      const { data, transformed, errors } = schema.validate('1234567890');
      expect(data).toBe('1234567890');
      expect(transformed).toBe('1234567890');
      expect(errors).toHaveLength(0);
    });

    it('[between] should return an error message for an entry longer than the threshold', () => {
      const schema = Nope.string().between(5, 6);
      const { data, transformed, errors } = schema.validate('magicalmystery');
      expect(data).toBe('magicalmystery');
      expect(transformed).toBe('magicalmystery');
      expect(errors).toHaveLength(1);
      expect(errors[0]).toBe('Input is too long');
    });

    it('[between] should return an empty errors array for both equal entries to the threshold', () => {
      const schema = Nope.string().between(5, 5);
      const { data, transformed, errors } = schema.validate('seven');
      expect(data).toBe('seven');
      expect(transformed).toBe('seven');
      expect(errors).toHaveLength(0);
    });

    it('[between] should throw an error if used wrongly', () => {
      const schema = Nope.string().between(5, 1);
      expect(() => schema.validate('John Doe')).toThrow(
        'between must receive an initial length (startLength) smaller than the final length (endLength) parameter',
      );
    });

    it('[exactLength] should return an empty errors array for a valid entry', () => {
      const schema = Nope.string().exactLength(5, 'exact-length-error-message');
      const { data, transformed, errors } = schema.validate('lucky');
      expect(data).toBe('lucky');
      expect(transformed).toBe('lucky');
      expect(errors).toHaveLength(0);
    });

    it('[exactLength] should return an empty errors array for an empty entry', () => {
      const schema = Nope.string().exactLength(5, 'exact-length-error-message');
      const { data, transformed, errors } = schema.validate('');
      expect(data).toBe('');
      expect(transformed).toBe('');
      expect(errors).toHaveLength(0);
    });

    it('[exactLength] should return an error message for an entry shorter than the threshold', () => {
      const schema = Nope.string().exactLength(5, 'exact-length-error-message');
      const { data, transformed, errors } = schema.validate('tour');
      expect(data).toBe('tour');
      expect(transformed).toBe('tour');
      expect(errors).toHaveLength(1);
      expect(errors[0]).toBe('exact-length-error-message');
    });

    it('[exactLength] should return an error message for an entry longer than the threshold', () => {
      const schema = Nope.string().exactLength(5);
      const { data, transformed, errors } = schema.validate('magicalmystery');
      expect(data).toBe('magicalmystery');
      expect(transformed).toBe('magicalmystery');
      expect(errors).toHaveLength(1);
      expect(errors[0]).toBe('Must be at exactly of length 5');
    });

    it('[exactLength] should return an empty errors array for an entry equal to the threshold', () => {
      const schema = Nope.string().exactLength(7, 'exact-length-error-message');
      const { data, transformed, errors } = schema.validate('ftonato');
      expect(data).toBe('ftonato');
      expect(transformed).toBe('ftonato');
      expect(errors).toHaveLength(0);
    });

    it('[required] should return an error message for undefined entry', () => {
      const schema = Nope.string().required('required-error-message');
      const { data, transformed, errors } = schema.validate(undefined);
      expect(data).toBeUndefined();
      expect(transformed).toBeUndefined();
      expect(errors).toHaveLength(1);
      expect(errors[0]).toBe('required-error-message');
    });

    it('[required] should return an error message for null entry', () => {
      const schema = Nope.string().required();
      const { data, transformed, errors } = schema.validate(null);
      expect(data).toBe(null);
      expect(transformed).toBe(null);
      expect(errors).toHaveLength(1);
      expect(errors[0]).toBe('This field is required');
    });

    it('[required] should return an error message for empty entry', () => {
      const schema = Nope.string().required('required-error-message');
      const { data, transformed, errors } = schema.validate('');
      expect(data).toBe('');
      expect(transformed).toBe('');
      expect(errors).toHaveLength(1);
      expect(errors[0]).toBe('required-error-message');
    });

    it('[required] should return an error message for a string of white-spaces', () => {
      const schema = Nope.string().required('required-error-message');
      const { data, transformed, errors } = schema.validate('   ');
      expect(data).toBe('   ');
      expect(transformed).toBe('   ');
      expect(errors).toHaveLength(1);
      expect(errors[0]).toBe('required-error-message');
    });
  });

  // describe.skip('#trim', () => {
  //   it('should remove the whitespace from the entry and return undefined [email]', async () => {
  //     const ERR_MSG = 'error-message';
  //     const schema = Nope.string().trim().email(ERR_MSG);

  //     for (const { value, expected } of [
  //       { value: ' ftonato@example.com ', expected: undefined },
  //       { value: ' ftonato@example.io', expected: undefined },
  //       { value: 'ftonato@example.me ', expected: undefined },
  //       { value: 'ftonato@example.me', expected: undefined },
  //     ]) {
  //       await validateSyncAndAsync(schema, value, expected);
  //     }
  //   });

  //   it('should remove the whitespace from the entry and return undefined [required]', async () => {
  //     const schema = Nope.string().trim().required('requiredMessage');

  //     for (const { value, expected } of [
  //       { value: ' space-text-space ', expected: undefined },
  //       { value: ' space-text', expected: undefined },
  //       { value: 'text-space ', expected: undefined },
  //       { value: 'text', expected: undefined },
  //     ]) {
  //       await validateSyncAndAsync(schema, value, expected);
  //     }
  //   });
  // });
});

import { NopePrimitive } from './NopePrimitive';
import { Nil, Rule } from './types';
import { isNil } from './utils';

export class NopeNumber extends NopePrimitive<number> {
  protected _type = 'number';
  protected entry = Number.MIN_SAFE_INTEGER;
  protected transformed = Number.MIN_SAFE_INTEGER;

  // ################
  // shared methods
  // ################
  protected isEmpty(entry: number | string | Nil): boolean {
    // return !!(entry?.length === 0);

    return isNil(entry) || (typeof entry === 'string' && entry?.trim().length === 0);
  }

  public validate(entry?: any, context?: Record<string | number, unknown>) {
    const transformed = !!entry ? Number(entry) : entry;

    if (!this.isEmpty(transformed) && Number.isNaN(transformed)) {
      throw Error('The entry is not a valid number');
    }

    // TODO: Set return type
    return super.validate(entry, context);
    // return super.validateWithTransform(entry, transformed, context);
  }

  // ################
  // transforms
  // ################
  public round(type: 'floor' | 'ceil' | 'trunc' | 'round' = 'round'): this {
    const rule = () => {
      this.transformed = Math[type](this.entry as number);
      return;
    };

    return this.test(rule);
  }

  // ################
  // hooks
  // ################

  public integer(message = 'Input must be an integer') {
    const rule: Rule<number> = (entry) => {
      if (this.isEmpty(entry)) {
        return;
      }

      if (entry !== Math.floor(entry as number)) {
        return message;
      }
    };

    return this.test(rule);
  }

  public min(size: number, message?: string) {
    this.greaterThan(size, message);
    return this;
  }

  public max(size: number, message?: string) {
    this.lessThan(size, message);
    return this;
  }

  public greaterThan(size: number, message = 'Input is too small') {
    const rule: Rule<number> = (entry) => {
      if (this.isEmpty(entry)) {
        return;
      }

      if ((entry as number) <= size) {
        return message;
      }
    };

    return this.test(rule);
  }

  public lessThan(size: number, message = 'Input is too large') {
    const rule: Rule<number> = (entry) => {
      if (this.isEmpty(entry)) {
        return;
      }

      if ((entry as number) >= size) {
        return message;
      }
    };

    return this.test(rule);
  }

  public atLeast(size: number, message = 'Input is too small') {
    const rule: Rule<number> = (entry) => {
      if (this.isEmpty(entry)) {
        return;
      }

      if ((entry as number) < size) {
        return message;
      }
    };

    return this.test(rule);
  }

  public atMost(size: number, message = 'Input is too large') {
    const rule: Rule<number> = (entry) => {
      if (this.isEmpty(entry)) {
        return;
      }

      if ((entry as number) > size) {
        return message;
      }
    };

    return this.test(rule);
  }

  public between(
    sizeStart: number,
    sizeEnd: number,
    atLeastMessage = 'Input is too small',
    atMostMessage = 'Input is too large',
  ) {
    if (sizeStart && sizeEnd && sizeStart > sizeEnd) {
      const rule: Rule<any> = () => {
        throw Error(
          'between must receive an initial size (sizeStart) smaller than the final size (sizeEnd) parameter',
        );
      };

      return this.test(rule);
    }

    this.atLeast(sizeStart, atLeastMessage);
    this.atMost(sizeEnd, atMostMessage);

    return this;
  }

  public positive(message = 'Input must be positive') {
    this.greaterThan(0, message);
    return this;
  }

  public negative(message = 'Input must be negative') {
    this.lessThan(0, message);
    return this;
  }

  // public validateAsync(
  //   entry?: any,
  //   context?: Record<string | number, unknown>,
  // ): Promise<string | undefined> {
  //   const value = !!entry ? Number(entry) : entry;

  //   if (!this.isEmpty(value) && Number.isNaN(value)) {
  //     return Promise.resolve(this.message);
  //   }

  //   return super.validateAsync(value, context);
  // }
}

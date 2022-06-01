import { emailRegex, urlRegex } from './consts';
import { NopePrimitive } from './NopePrimitive';
import { Nil, Rule } from './types';
import { isNil } from './utils';

export class NopeString extends NopePrimitive<string> {
  protected _type = 'string';
  protected transformed = '';

  // ################
  // shared methods
  // ################
  protected isEmpty(entry: string | Nil): boolean {
    return isNil(entry) || entry?.trim().length === 0;
  }

  public validate(entry: string, context?: Record<string, unknown>) {
    // TODO: Set return type
    return super.validate(entry, context);
  }

  // ################
  // transforms
  // ################
  public trim(): this {
    const rule = () => {
      this.transformed = this.transformed.trim();
      return;
    };

    return this.test(rule);
  }

  public toUpperCase(): this {
    const rule = () => {
      this.transformed = this.transformed?.toUpperCase();
      return;
    };
    return this.test(rule);
  }

  public toLowerCase(): this {
    const rule = () => {
      this.transformed = this.transformed?.toLowerCase();
      return;
    };
    return this.test(rule);
  }

  // ################
  // hooks
  // ################
  public regex(regex: RegExp, message = "Doesn't satisfy the rule"): this {
    const rule: Rule<string> = (entry) => {
      if (this.isEmpty(entry)) {
        return;
      }

      if (!regex.test(entry as string)) {
        return message;
      }
    };

    return this.test(rule);
  }

  public url(message = 'Input is not a valid url'): this {
    this.regex(urlRegex, message);
    return this;
  }

  public email(message = 'Input is not a valid email'): this {
    this.regex(emailRegex, message);
    return this;
  }

  public min(length: number, message?: string): this {
    this.greaterThan(length, message);
    return this;
  }

  public max(length: number, message?: string): this {
    this.lessThan(length, message);
    return this;
  }

  public greaterThan(length: number, message = 'Input is too short'): this {
    const rule: Rule<string> = (entry) => {
      if (this.isEmpty(entry)) {
        return;
      }

      const value = entry as string;
      if (value.length <= length) {
        return message;
      }
    };

    return this.test(rule);
  }

  public lessThan(length: number, message = 'Input is too long'): this {
    const rule: Rule<string> = (entry) => {
      if (this.isEmpty(entry)) {
        return;
      }

      const value = entry as string;
      if (value.length >= length) {
        return message;
      }
    };

    return this.test(rule);
  }

  public atLeast(length: number, message = 'Input is too short') {
    const rule: Rule<string> = (entry) => {
      if (this.isEmpty(entry)) {
        return;
      }

      const value = entry as string;
      if (value.length < length) {
        return message;
      }
    };

    return this.test(rule);
  }

  public atMost(length: number, message = 'Input is too long') {
    const rule: Rule<string> = (entry) => {
      if (this.isEmpty(entry)) {
        return;
      }

      const value = entry as string;
      if (value.length > length) {
        return message;
      }
    };

    return this.test(rule);
  }

  public between(
    startLength: number,
    endLength: number,
    atLeastMessage = 'Input is too short',
    atMostMessage = 'Input is too long',
  ) {
    if (startLength && endLength && startLength > endLength) {
      const rule: Rule<any> = () => {
        // TODO: It could be a custom error
        throw Error(
          'between must receive an initial length (startLength) smaller than the final length (endLength) parameter',
        );
      };

      return this.test(rule);
    }

    this.atLeast(startLength, atLeastMessage);
    this.atMost(endLength, atMostMessage);

    return this;
  }

  public exactLength(length: number, message = `Must be at exactly of length ${length}`): this {
    const rule: Rule<string> = (entry) => {
      if (this.isEmpty(entry)) {
        return;
      }

      const value = entry as string;
      if (value.length !== length) {
        return message;
      }
    };

    return this.test(rule);
  }

  // TODO: Add default method
}

import { NopePrimitive } from './NopePrimitive';
import { NopeReference } from './NopeReference';
import { Rule } from './types';

type TDate = string | number | Date;

export class NopeDate extends NopePrimitive<TDate> {
  private message: string;
  protected _type = 'object';
  protected entry: TDate | undefined;
  protected transformed: TDate | undefined;

  // ################
  // shared methods
  // ################
  public constructor(message = 'The entry is not a valid date') {
    super();
    this.message = message;
  }

  public validate(
    entry?: any,
    context?: Record<string | number, unknown>,
  ): string | undefined | any {
    try {
      this.entry = entry;
      this.transformed = this.parseDate(entry);
    } catch (error) {
      return error;
    }

    return super.validateWithTransform(this.entry, this.transformed, context);
  }
  // public validateAsync(
  //   entry?: any,
  //   context?: Record<string | number, unknown>,
  // ): Promise<string | undefined | any> {
  //   let value;

  //   try {
  //     value = this.parseDate(entry);
  //   } catch (error) {
  //     return Promise.resolve(error);
  //   }

  //   return super.validateAsync(value, context);
  // }

  // ################
  // transforms
  // ################
  private parseDate(entry?: any) {
    let value = entry;

    if (this.isEmpty(entry) || entry instanceof Date) {
      value = entry;
    } else if (!isNaN(+new Date(entry))) {
      value = new Date(entry);
    } else {
      const ms = new Date(entry);

      if (isNaN(+ms)) {
        throw this.message;
      }

      value = new Date(ms);
    }

    return value;
  }

  // ################
  // hooks
  // ################
  public before(
    beforeDate: TDate | NopeReference,
    message = `Date must be before ${beforeDate.toString()}`,
  ) {
    const rule: Rule<TDate> = (entry, context) => {
      if (this.isEmpty(entry)) {
        return;
      }

      const resolvedBeforeDate =
        beforeDate instanceof NopeReference && context ? context[beforeDate.key] : beforeDate;

      if (new Date(entry as Date) >= new Date(resolvedBeforeDate)) {
        return message;
      }
    };

    return this.test(rule);
  }

  public after(afterDate: TDate | NopeReference, message = `Date must be after ${afterDate}`) {
    const rule: Rule<TDate> = (entry, context) => {
      if (this.isEmpty(entry)) {
        return;
      }

      const resolvedAfterDate =
        afterDate instanceof NopeReference && context ? context[afterDate.key] : afterDate;

      if (new Date(entry as Date) <= new Date(resolvedAfterDate)) {
        return message;
      }
    };

    return this.test(rule);
  }
}

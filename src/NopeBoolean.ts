import { NopePrimitive } from './NopePrimitive';
import { Rule } from './types';

export class NopeBoolean extends NopePrimitive<boolean> {
  protected _type = 'boolean';

  // ################
  // shared methods
  // ################
  public validate(entry: boolean, context?: Record<string | number, unknown>) {
    // TODO: Set return type
    return super.validate(entry, context);
  }

  // ################
  // hooks
  // ################
  public true(message = 'Input must be true') {
    const rule: Rule<boolean> = (entry) => {
      if (this.isEmpty(entry)) {
        return;
      }

      if (entry !== true) {
        return message;
      }
    };

    return this.test(rule);
  }

  public false(message = 'Input must be false') {
    const rule: Rule<boolean> = (entry) => {
      if (this.isEmpty(entry)) {
        return;
      }

      if (entry !== false) {
        return message;
      }
    };

    return this.test(rule);
  }
}

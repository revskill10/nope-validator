// shared types
import { NopePrimitive } from './NopePrimitive';

type RuleResult<T> = string | undefined | NopePrimitive<T>;

export type Context = Record<string | number, any>;

export type Rule<T> = (entry?: T | null, context?: Context) => RuleResult<T>;

export type AsyncRule<T> = (entry?: T | null, context?: Context) => Promise<RuleResult<T>>;

export type ValidateResponse<T> = (
  entry?: T | null,
  transformed?: T | null,
  context?: Context,
) => {
  data: T | Nil;
  transformed: T | Nil;
  errors: any[];
};

export interface Validatable<T> {
  validate: ValidateResponse<T>; // Rule<T>
  validateWithTransform?: ValidateResponse<T>; // Rule<T>
  validateAsync: AsyncRule<T>;
  getType: () => string;
}

export interface ShapeErrors {
  [key: string]: string | ShapeErrors;
}

export type Nil = null | undefined;

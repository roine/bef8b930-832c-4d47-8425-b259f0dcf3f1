/**
 * Code taken from my own repository:
 * https://github.com/roine/functional-tools/blob/master/lib/containers/remoteData.ts
 *
 * More details about why this is useful can be found here:
 * http://blog.jenkster.com/2016/06/how-elm-slays-a-ui-antipattern.html
 */

const Initial = "initial";
const Pending = "pending";
const Failure = "failure";
const Success = "success";

export type Initial = {
  readonly _tag: typeof Initial;
};

export type Pending = {
  readonly _tag: typeof Pending;
};

export type Failure<E> = {
  readonly _tag: typeof Failure;
  readonly error: E;
};

export type Success<A> = {
  readonly _tag: typeof Success;
  readonly value: A;
};

export type Model<E, A> = Initial | Pending | Failure<E> | Success<A>;

// CONSTRUCTORS

export const initial: Model<never, never> = {
  _tag: Initial,
};

export const pending: Model<never, never> = {
  _tag: Pending,
};

export const failure = <E>(error: E): Model<E, never> => ({
  _tag: Failure,
  error,
});

export const success = <A>(value: A): Model<never, A> => ({
  _tag: Success,
  value,
});

// CHECKERS

export const isInitial = (
  remoteData: Model<unknown, unknown>,
): remoteData is Initial => remoteData._tag === Initial;

export const isPending = (
  remoteData: Model<unknown, unknown>,
): remoteData is Pending => remoteData._tag === Pending;

export const isFailure = <E>(
  remoteData: Model<E, unknown>,
): remoteData is Failure<E> => remoteData._tag === Failure;

export const isSuccess = <A>(
  remoteData: Model<unknown, A>,
): remoteData is Success<A> => remoteData._tag === Success;

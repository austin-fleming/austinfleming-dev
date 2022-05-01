// HACK: This is a direct copy-paste from the pipe function in packages/shared.
// sanity-codegen doesn't like when functions from another sub-repo are pulled into a schema.
// See the other function for tests and notes.
// May be related to how sanity projects don't respect ts-config settings

/* eslint-disable unicorn/prevent-abbreviations, unicorn/no-array-reduce */
type Any = any;

type Fn<Tin extends Any[], Tout> = (...args: Tin) => Tout;

type UnaryFn<Tin, Tout> = Fn<[Tin], Tout>;

const pipeImplementation = <A extends Any[], B>(
	...operations: [firstOperation: Fn<A, Any>, ...otherOperations: UnaryFn<Any, Any>[]]
): Fn<A, B> => {
	const [firstOperation, ...otherOperations] = operations;
	return (...args: A) =>
		otherOperations.reduce((acc, operation) => operation(acc), firstOperation(...args));
};

export function pipe<TIn extends Any[], TOut>(f0: Fn<TIn, TOut>): Fn<TIn, TOut>;
// 2
export function pipe<TIn extends Any[], T2, TOut>(
	f1: Fn<TIn, T2>,
	f2: UnaryFn<T2, TOut>
): Fn<TIn, TOut>;
// 3
export function pipe<TIn extends Any[], T2, T3, TOut>(
	f1: Fn<TIn, T2>,
	f2: UnaryFn<T2, T3>,
	f3: UnaryFn<T3, TOut>
): Fn<TIn, TOut>;
// 4
export function pipe<TIn extends Any[], T2, T3, T4, TOut>(
	f1: Fn<TIn, T2>,
	f2: UnaryFn<T2, T3>,
	f3: UnaryFn<T3, T4>,
	f4: UnaryFn<T4, TOut>
): Fn<TIn, TOut>;
// 5
export function pipe<TIn extends Any[], T2, T3, T4, T5, TOut>(
	f1: Fn<TIn, T2>,
	f2: UnaryFn<T2, T3>,
	f3: UnaryFn<T3, T4>,
	f4: UnaryFn<T4, T5>,
	f5: UnaryFn<T5, TOut>
): Fn<TIn, TOut>;
// 6
export function pipe<TIn extends Any[], T2, T3, T4, T5, T6, TOut>(
	f1: Fn<TIn, T2>,
	f2: UnaryFn<T2, T3>,
	f3: UnaryFn<T3, T4>,
	f4: UnaryFn<T4, T5>,
	f5: UnaryFn<T5, T6>,
	f6: UnaryFn<T6, TOut>
): Fn<TIn, TOut>;
// 7
export function pipe<TIn extends Any[], T2, T3, T4, T5, T6, T7, TOut>(
	f1: Fn<TIn, T2>,
	f2: UnaryFn<T2, T3>,
	f3: UnaryFn<T3, T4>,
	f4: UnaryFn<T4, T5>,
	f5: UnaryFn<T5, T6>,
	f6: UnaryFn<T6, T7>,
	f7: UnaryFn<T7, TOut>
): Fn<TIn, TOut>;
// 8
export function pipe<TIn extends Any[], T2, T3, T4, T5, T6, T7, T8, TOut>(
	f1: Fn<TIn, T2>,
	f2: UnaryFn<T2, T3>,
	f3: UnaryFn<T3, T4>,
	f4: UnaryFn<T4, T5>,
	f5: UnaryFn<T5, T6>,
	f6: UnaryFn<T6, T7>,
	f7: UnaryFn<T7, T8>,
	f8: UnaryFn<T8, TOut>
): Fn<TIn, TOut>;
// 9
export function pipe<TIn extends Any[], T2, T3, T4, T5, T6, T7, T8, T9, TOut>(
	f1: Fn<TIn, T2>,
	f2: UnaryFn<T2, T3>,
	f3: UnaryFn<T3, T4>,
	f4: UnaryFn<T4, T5>,
	f5: UnaryFn<T5, T6>,
	f6: UnaryFn<T6, T7>,
	f7: UnaryFn<T7, T8>,
	f8: UnaryFn<T8, T9>,
	f9: UnaryFn<T9, TOut>
): Fn<TIn, TOut>;
// 10
export function pipe<TIn extends Any[], T2, T3, T4, T5, T6, T7, T8, T9, T10, TOut>(
	f1: Fn<TIn, T2>,
	f2: UnaryFn<T2, T3>,
	f3: UnaryFn<T3, T4>,
	f4: UnaryFn<T4, T5>,
	f5: UnaryFn<T5, T6>,
	f6: UnaryFn<T6, T7>,
	f7: UnaryFn<T7, T8>,
	f8: UnaryFn<T8, T9>,
	f9: UnaryFn<T9, T10>,
	f10: UnaryFn<T10, TOut>
): Fn<TIn, TOut>;
export function pipe<TIn extends Any[], TOut>(
	firstOperation: Fn<TIn, Any>,
	...operations: UnaryFn<Any, Any>[]
): Fn<TIn, TOut> {
	return pipeImplementation(firstOperation, ...operations);
}

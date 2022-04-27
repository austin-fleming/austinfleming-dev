export const map =
	<T, U>(fn: (values: T) => U) =>
	(values: T[]) =>
		values.map(fn);

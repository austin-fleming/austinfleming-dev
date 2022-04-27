export type Nothing = null | undefined;

export const isNothing = (value: unknown): value is Nothing =>
	value === null || value === undefined;

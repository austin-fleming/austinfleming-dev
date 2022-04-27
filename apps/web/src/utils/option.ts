/* eslint-disable @typescript-eslint/no-explicit-any */

// Inspired by: https://github.com/hbel/tsmonads/blob/master/src/maybemonad.ts

import { isNothing, type Nothing } from './nothing';

export abstract class Option<T> {
	/**
	 * Check if a function returns true for Some. False otherwise.
	 * For example option.is(greaterThan5)
	 */
	public abstract is(fn: (value: T) => boolean): boolean;

	public abstract isNone(): this is None;
	public abstract isSome(): this is Some<T>;
	/**
	 * Apply the first function to value if Some or the second function to None
	 */
	public abstract match<U>(onSome: (value: T) => U, onNone: () => U): U;
	/**
	 * Apply a function to the option value.
	 */
	public abstract map<U>(fn: (value: T) => U): Option<U>;

	/**
	 * Apply a function that returns an option.
	 */
	public abstract flatMap<U>(fn: (value: T) => Option<U>): Option<U>;

	/**
	 * Perform a function with the option's value if Some, then return the option
	 */
	public abstract forEach(fn: (value: T) => void): Option<T>;

	/**
	 * Apple a reducer function if some, or return initial value if None
	 */
	public abstract reduce<U>(fn: (accumulator: U, current: T) => U, initialValue: U): U;

	/**
	 * Returns the value. Throws error if None.
	 */
	public abstract unwrap(): T;
	/**
	 * Unwrap, with a fallback if value is Option is None
	 */
	public abstract unwrapOrElse(fallback: T): T;
	/**
	 * Unwrap value if Some or return undefined if None
	 */
	public abstract unwrapOrUndefined(): T | undefined;
	/**
	 * Create an option instance
	 */
	public static of = <T>(value: T | Nothing): Option<T> =>
		isNothing(value) ? new None() : new Some<T>(value);
	/**
	 * Create a None instance
	 */
	public static none = () => new None();
	public static some = <T>(value: T) => new Some<T>(value);
}

export class Some<T> implements Option<T> {
	constructor(private readonly _value: T) {
		if (isNothing(_value)) throw new Error('"Some" must not be null or undefined.');
	}

	public match<U>(onSome: (value: T) => U, onNone: () => U): U {
		return onSome(this._value);
	}

	public map<U>(fn: (value: T) => U): Option<U> {
		return new Some(fn(this._value));
	}

	public flatMap<U>(fn: (value: T) => Option<U>): Option<U> {
		return fn(this._value);
	}

	public forEach(fn: (value: T) => void): Option<T> {
		const someCopy = Option.of(this._value);
		fn(someCopy.unwrap());
		return this;
	}

	public is(fn: (value: T) => boolean): boolean {
		return fn(this._value);
	}

	public isNone() {
		return false;
	}

	public isSome() {
		return true;
	}

	public reduce<U>(fn: (accumulator: U, current: T) => U, initialValue: U): U {
		return fn(initialValue, this._value);
	}

	public unwrap(): T {
		return this._value;
	}
	public unwrapOrElse(): T {
		return this._value;
	}

	public unwrapOrUndefined(): T {
		return this._value;
	}
}

export class None implements Option<any> {
	public match<U>(onSome: (value: any) => U, onNone: () => U): U {
		return onNone();
	}

	public map<T, U>(fn: (value: T) => U): Option<U> {
		return new None();
	}

	public flatMap<U>(fn: (value: any) => Option<U>): Option<U> {
		return new None();
	}

	public forEach(fn: (value: any) => void) {
		return this;
	}

	public is(): boolean {
		return false;
	}

	public isNone() {
		return true;
	}

	public isSome() {
		return false;
	}

	public reduce<U>(fn: (accumulator: U, current: any) => U, initialValue: U): U {
		return initialValue;
	}

	public unwrap<T>(): T {
		throw new Error('Called unwrap on a None option.');
	}
	public unwrapOrElse<T>(fallback: T): T {
		return fallback;
	}

	public unwrapOrUndefined() {
		/* eslint-disable-next-line unicorn/no-useless-undefined */
		return undefined;
	}
}

export const none = () => new None();

export const option = <T>(value: T | Nothing): Option<T> =>
	isNothing(value) ? new None() : new Some<T>(value);

///////

// Helper to break typescript inference while testing option
const createUncertainty = (x: number): number | undefined => (Math.random() > 0.5 ? undefined : x);

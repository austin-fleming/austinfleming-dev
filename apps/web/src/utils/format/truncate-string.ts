export const truncateString = (input: string, length: number): string =>
	input.length > length ? `${input.slice(0, length).trim()}...` : input;

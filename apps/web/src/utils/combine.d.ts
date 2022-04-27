import type { Expand } from './expand';

export type Combine<U, T> = Expand<U & T>;

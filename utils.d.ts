// override and append props in R to T
type Override<T, R> = Omit<T, keyof R> & R;
// select props as partial
type PartialSelect<T, P extends keyof T> = Omit<T, P> & Partial<Pick<T, P>>;
// remove readonly modifier
type Writeable<T> = { -readonly [P in keyof T]: T[P] };

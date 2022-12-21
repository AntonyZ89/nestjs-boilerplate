// override and append props in R to T
type Override<T, R> = Omit<T, keyof R> & R;
// select props as partial
type PartialSelect<T, P extends keyof T> = Omit<T, P> & Partial<Pick<T, P>>;

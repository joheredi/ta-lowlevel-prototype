// Checks if a given object contains any required properties
export type AnyRequired<T> = {} extends T ? false : true;

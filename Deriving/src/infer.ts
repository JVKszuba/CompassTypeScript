/**
 * The `infer` keyword allows you to extract (or "infer") a type from within another type.
 * A common use case is to infer the return type of a function.
 */

function add(a: number, b: number) { return a + b; }

type AddFn = typeof sum;
type ReturnValueType<T> = T extends (...args: any[]) => infer Rv ? Rv : never;

type AddFnReturnValueType<T> = ReturnValueType<AddFn>;
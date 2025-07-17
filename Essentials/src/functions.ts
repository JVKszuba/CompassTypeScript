/**
 * As shown before, function parameters can have explicit types,
 * and the function itself can also declare an explicit return type.
 */

function sumNumbers(a: number, b: number): number {

    return a + b;
}

/**
 * If a function does not return any value, its return type is `void`.
 * This can be explicitly declared, but if no `return` is present, the return type is inferred as `void`.
 */

function log(message: string): void {

    console.log(message);
}

/**
 * In some cases, a function is not expected to return at all.
 * This typically happens when the function always throws an error or has an infinite loop.
 * In such cases, the return type should be `never`, meaning the function never completes normally.
 */

function logAndThrow(errorMessage: string): never {

    console.log(errorMessage);

    throw new Error(errorMessage);
}

/**
 * Functions can also accept other functions as parameters — these are called callback functions.
 * When doing this, you should specify the parameter types and return type of the callback.
 */

function performJob(cb: (msg: string) => void) {

    //...

    cb('Job done!');
}

performJob(log)

/**
 * Just like you can type functions as parameters, you can also
 * define function types inside object types.
 */

type UserNew = {
    name: string;
    age: number;
    greet: (msg: string) => void;
}

let userNew: UserNew = {
    name: 'Max',
    age: 39,
    greet() {console.log('Hello World');},
}


/**
 * Variables in TypeScript can have explicit types, such as `boolean`, `string`, `number`, etc.
 * Once defined, the variable's type cannot change throughout the program.
 */

let userName: string;

/**
 * When a variable is initialized with a value, its type is inferred automatically.
 * There's no need for an explicit type annotation.
 */

let userAge = 38;

userName = 'Max';
//userAge = '10'; // Error: '10' is a string, but userAge was inferred as a number.

/**
 * Function parameters can have explicit types.
 * When the function is called, the types are checked and mismatch types are rejected.
 *
 * @param a - First number to add.
 * @param b - Second number to add.
 */

function add(a: number, b: number) {

    return a + b;
}

add(5, 5);
add(10, 6);
//add(10, '1'); // Error: Argument of type 'string' is not assignable to parameter of type 'number'.

/**
 * Functions can also have an explicit return type declaration.
 *
 * @param a - First number to add.
 * @param b - Second number to add.
 * @returns The sum of `a` and `b` as a number.
 */

function addNumber(a: number, b: number): number {

    return a + b;
}

let result = addNumber(5, 5);
let error: string;

//error = addNumber(10, 5) // Error: Type 'number' is not assignable to type 'string'.


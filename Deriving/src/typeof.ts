/**
 * The `typeof` keyword can be used to create a new type based on the type of existing variable.
 * This is useful to ensure consistency with a reference value.
 */

const userName = 'Max';

type UserName = typeof userName;

/**
 * `typeof` can also infer the structure of more complex objects,
 * allowing you to reuse their shape as a type in other parts of the code.
 */

const settings = {
    difficulty: 'easy',
    minLevel: 10,
    didStart: false,
    players: ['John', 'Jane']
}

type Settings = typeof settings;

function loadData(settings: Settings) {

    //...
}

/**
 * When working with functions, `typeof` can capture the exact
 * signature of a function, making it possible to reuse or combine
 * callback types without manually redefining them.
 */

function sum(a: number, b: number) {return a + b;}
function subtract(a: number, b: number) {return a - b;}

type SumFn = typeof sum;
type SubtractFn = typeof subtract;

function performMathAction(cb: SumFn | SubtractFn) {

    //...
}
/**
 * One special type that a variable can assume is `null`,
 * which represents an explicitly empty value.
 */

let a: null;

a = null;
//a = 'Hi!' //Error: Type 'string' is not assignable to type 'null'

/**
 * Another special type is `undefined`, which usually means a variable has not been assigned a value yet.
 */

let b: undefined

b = undefined;
//b = null; //Error: Type 'null' is not assignable to type 'undefined'

/**
 * These types become especially useful when working with `Union Types`.
 * Sometimes a variable may be `null` or `undefined` before being initialized with a final value.
 */

let c: null | undefined | string;

c = undefined;
c = null
c = 'Hi'

/**
 * You can use the non-null assertion operator (`!`) to tell that a value is definitely
 * not null or undefined, even if the type allows it.
 */

let maybeNull: null | string

let notNull = maybeNull!;

/**
 * Type assertions can be used to treat a value as a specific type.
 * The `as` keyword is used for this purpose.
 */

let genericObject: string = '43';

//let specificObject = genericObject as number;

/**
 * The `unknown` type is similar to `any`, allowing assignment of any value.
 * However, it requires type checking before usage, making it safer than `any`.
 */

function process(val: unknown) {

    if (typeof val === 'object' && !!val && 'log' in val && typeof val.log === 'function') {

        val.log();
    }
}

/**
 * You can define optional parameters in functions by using the `?` symbol.
 * This indicates that the parameter is not required when the function is called.
 */

function generateLog(msg?: string): void {

   console.log(msg ? msg : 'Message not delivered');
}

generateLog('Hello World')
generateLog();

/**
 * Optional parameters can also be used in object type definitions,
 * when some fields are not strictly required.
 */

type anotherUser = {
    name: string;
    age: number;
    role?: 'admin' | 'guest';
}

let userOne: anotherUser = {name: 'Max', age: 35, role: 'admin'};
let userTwo: anotherUser = {name: 'Max', age: 35};

/**
 * To check if a value is either `null` or `undefined`, you can use the nullish coalescing operator `??`,
 * which provides a default value only when the left-hand operand is `null` or `undefined`.
 */

let input = '';

const didProvideInput = input || false;
const didProvideInputNullish = input ?? false;


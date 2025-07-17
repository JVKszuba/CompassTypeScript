/**
 * The type of array is also checked when adding new elements.
 */

let hobbies = ['Sports', 'Cooking']

hobbies.push('Fishing');
//hobbies.push(10) //Error: Type 'number' is not assignable to type 'string'

/**
 * Using a `Union Type`, you can explicitly allow multiple types in an array.
 */

let users: (string | number)[];

users = [1, 'Max'];
users = [5, 1]
users = ['Max', 'Anna']

/**
 * Arrays that support multiple types can also be declared using the `Array` generic syntax.
 */

let usersArray: Array<string | number>

usersArray = [1, 'Max'];
usersArray = [5, 1]
usersArray = ['Max', 'Anna']

/**
 * You can also define a fixed-length array with specific types for each position.
 * This is called a `Tuple`.
 */

let possibleResults: [number, number];

possibleResults = [1, -1];
//possibleResults = [5, 10, 12]; //Error: Type '[number, number, number]' is not assignable to type '[number, number]'

/**
 * Objects can have explicitly typed properties, including nested properties.
 * Type checking will be enforced down to the deepest level.
 */

let user: {
    name: string,
    age: number | string,
    hobbies: string[],
    role: {
        description: string,
        id: number
    }
}

/**
 * Using `{}` as a type means "any non-nullish value" — that is, any value except `null` or `undefined`.
 */

let val: {} = 'some text'

/**
 * When declaring an object without specific property names, use the `Record` utility type.
 * This defines a dictionary-like structure with key and value type constraints.
 */

let data: Record<string, number | string>

data = {
    entry1: 1,
    entry2: 'some text',
}
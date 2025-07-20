/**
 * `Generics` allow you to define reusable types that can work with different data types.
 * They offer flexibility when describing structures by deferring the exact type until use.
 */

let names: Array<string> = ['Max', 'Anna']

/**
 * To declare a custom generic type, you use angle brackets (`<>`) with a placeholder.
 * This placeholder will be replaced with a specific type when the type is instantiated.
 */

type DataStore<T> = {

    [prop: string]: T,
}

let nameStore: DataStore<string> = {}
nameStore.name = 'Max';
//nameStore.isInstructor = true; //Error: Type 'boolean' is not assignable to type 'string'

let store: DataStore<string | boolean> = {}
store.name = 'Anna';
store.isInstructor = true;

/**
 * Functions can also be generic by using a placeholder for the input type.
 * This allows the function to handle multiple data types while remaining type-safe.
 */

function merge<T>(a: T, b: T) {

    return [a, b];
}

const ids = merge<number>(1, 2);

/**
 * You can use multiple placeholders to accept more than one type as input,
 * enabling more complex and flexible type relationships.
 */

function mergeTwo<T, U>(a: T, b: U) {

    return [a, b];
}

const idsTwo = mergeTwo(1, 'Max')

/**
 * Generic constraints allow you to limit which types can be used,
 * enforcing a certain structure while retaining flexibility. For this,
 * you need to use the `extends` keyword followed by the type that is allowed.
 */

function mergeObj<T extends object>(a: T, b: T) {

    return {...a, ...b};
}

const merged = mergeObj({name: 'Max'}, {age: 35})

/**
 * By using separate constraints for each parameter, you can combine
 * different object shapes while still benefiting from type safety.
 */

function mergeObjSpecific<T extends object, U extends object>(a: T, b: U) {

    return {...a, ...b};
}

const mergedSpecific = mergeObjSpecific({name: 'Max'}, {age: 35})

/**
 * Classes and interfaces can also be generic, allowing you to define class properties or methods
 * that are strongly typed but remain adaptable to different data types.
 */

class User<T> {

    constructor(public id: T) {}
}

const user = new User('i1')

/**
 * `Mapped Types` allow you to create new types by transforming the properties
 * of an existing type.
 */

type Operations = {

    add: (a: number, b: number) => number;
    subtract: (a: number, b: number) => number;
}

let mathOperations: Operations = {

    add(a: number, b: number) {return a + b;},
    subtract(a: number, b: number) {return a - b},
}

type Result<T> = { [Key in keyof T]: number; }

let mathResult: Result<Operations> = {

    add: mathOperations.add(1, 2),
    subtract: mathOperations.subtract(5, 2),
}

/**
 * Mapped types can also be used to make all properties optional
 * by adding the `?` modifier to each key.
 */

type ResultsOptional<T> = { [K in keyof T]?: number };

let mathResultOptional: ResultsOptional<Operations> = {

    add: mathOperations.add(4, 3),
}

/**
 * The `-?` modifier removes the optional flag from properties,
 * making all keys required, even if they were optional in the original type.
 */

type OperationsOptional = {

    add?: (a: number, b: number) => number;
    subtract?: (a: number, b: number) => number;
}

type ResultMandatory<T> = { [Key in keyof T]-?: number; }

let mathResultMandatory: ResultMandatory<OperationsOptional> = {

    add: mathOperations.add(4, 3),
    subtract: mathOperations.subtract(4, 2),
}

/**
 * You can also use the `readonly` modifier in a mapped type to make all
 * properties immutable, meaning that cannot be reassigned after initialization.
 * You can use `-readonly`, as used in `-?`, to remove the immutability from a parameter.
 */

type ResultReadonly<T> = { readonly [Key in keyof T]: number; }

let mathResultReadonly: ResultReadonly<Operations> = {

    add: mathOperations.add(4, 6),
    subtract: mathOperations.subtract(4, 1),
}

//mathResultReadonly.add = 10 //Error: Cannot assign to 'add' because it is a read-only property.

/**
 * The `keyof` keyword creates a union type consisting of the property names
 * (keys) of a given object type. This is useful for working with dynamic property access.
 */

type User = {name: string, age: number};

type UserKeys = keyof User;

/**
 * `keyof` is especially powerful when used with generics, enabling type-safe
 * access to object properties. By combining `keyof` with generic constraints,
 * you can create flexible utility functions that still enforce the correct key usage.
 */

function getProp<T extends object, U extends keyof T>(obj: T, key: U) {

    const val = obj[key];

    if (val === undefined || val === null) {throw new Error('Accessing undefined or null value.');}

    return val;
}

const data = { id: 1, isStored: false, values: [1, -5, 10]}
const isStored = getProp(data, 'isStored');
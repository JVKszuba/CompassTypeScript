/**
 * `Index Types` allow the creation of flexible object types where the property keys
 * are not predefined, but must follow a specific type constraint.
 * They are useful when you want to define the allowed value types for arbitrary keys in an object.
 */

type DataStorage = {
    [prop: string]: number | boolean;
}

let store: DataStorage = {}

store.id = 5;
store.isOpen = false;
//store.name = 'Max' //Error: Type 'string' is not assignable to type 'number | boolean'

/**
 * The `as const` assertion makes values immutable and narrows their type to exact literal values.
 * It is useful for cases where a fixed set of values must be preserved, and mutation should be prevented.
 */

let roles = ['admin', 'guest', 'editor'] as const;

const firstRole = roles[0];
//roles.push('user'); //Error: Property 'push' does not exist on type 'readonly ["admin", "guest", "editor"]'

/**
 * The `satisfies` keyword ensures that an object matches a given type without narrowing
 * the type of the object’s values beyond their actual definitions.
 * This helps preserve specific literal types in the object while still enforcing a structure.
 */

const dataEntries = {

    entry1: 0.51,
    entry2: -1.23,

} satisfies Record<string, number>
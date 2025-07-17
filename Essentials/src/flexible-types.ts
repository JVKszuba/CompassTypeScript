/**
 * The `any` type allows a variable to hold any kind of value.
 * While this offers flexibility, it also removes type safety,
 * meaning the variable can change between a `string`, ``boolean``, ``object``, ``array``, etc.
 */

let age: any = 36;

//...

age = '37';
age = false;
age = {};
age = [];

/**
 * When a variable needs to support more than one specific type,
 * use `Union Types`. This allows the variable to accept a defined set of types.
 */

let ageFlexible: string | number = 36;

ageFlexible = '37';
//ageFlexible = true; // Error: Type 'boolean' is not assignable to type 'string | number'.
//ageFlexible = {}; // Error: Type '{}' is not assignable to type 'string | number'.
//ageFlexible = []; // Error: Type 'never[]' is not assignable to type 'string | number'.
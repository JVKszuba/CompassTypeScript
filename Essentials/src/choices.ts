/**
 * When you need to define a list of specific named values, you can use an `enum`.
 * Enums allow you to group related constants under a single type.
 */

enum Role {Admin, Editor, Guest}

/**
 * Once defined, an `enum` becomes a valid type that you can assign to variables.
 * Enum members can be accessed by name or by their numeric index (starting at 0 by default).
 */

let userRole: Role = 0;

//...

userRole = Role.Guest;

/**
 * As an alternative to ``Enums``, you can use `Literal Types` to define a set of valid values.
 */

let userRoleLiteral: 'admin' | 'editor' | 'guest';

//...

userRoleLiteral = 'editor';

/**
 * `Literal Types` can also be used to constrain array values to a specific set of allowed values.
 */

let possibleResultsLiteral: [1 | -1, 1 | -1];

possibleResultsLiteral = [1, -1];
//possibleResultsLiteral = [5, 10]; //Error: Type '5' is not assignable to type '1 | -1'. Type '10' is not assignable to type '1 | -1'.

/**
 * The `type` keyword allows you to define a custom alias for primitive, union, or complex types.
 */

type RoleLiteral = 'admin' | 'editor' | 'guest';

function access(role: Role) {

    //Function body
}

/**
 * You can also use the `type` keyword to define the structure of objects.
 */

type User = {
    name: string;
    age: number;
    role: RoleLiteral;
    permissions: Array<string>;
};


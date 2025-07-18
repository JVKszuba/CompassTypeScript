/**
 * An `interface` is like an abstract class, used to define the shape of an object.
 * They define what properties and methods a type should have, but not contain implementations.
 * Interfaces cannot be instantiated directly, and their main purpose is to act as
 * a contract for objects and classes to follow.
 */

interface Authenticatable {

    email: string;
    password: string;

    login(): void;
    logout(): void;
}

/**
 * When an object is declared with a specific interface type,
 * it must implement all properties and methods defined in the interface, but can
 * also include additional properties or methods.
 */

let user: Authenticatable;

user = {

    email: 'test@example.com',
    password: 'abc',

    login() {console.log('Logging in...');},
    logout() {console.log('Logging out...');}
};

/**
 * Classes can also implement one or more interfaces using the `implements` keyword.
 * This forces the class to define all the properties and methods declared in the interface.
 */

class AuthenticatableUser implements Authenticatable {

    constructor(public userName: string, public email: string, public password: string) {}

    login() {console.log('Logging in...');}
    logout() {console.log('Logging out...');}
}

/**
 * Interfaces are also useful as parameter types in functions.
 * This allows you to ensure that the argument passed to the function
 * matches a specific structure.
 * Any object or class that implements the interface will be valid as input.
 */

function authenticatedSession(user: Authenticatable) {

    user.login();

    //...

    user.logout();
}

authenticatedSession(user);

/**
 * Interfaces can also be extended to create more specific versions.
 * Using the `extends` keyword, you create a new interface based on an existing one,
 * while adding new properties or methods, promoting reusability and keeping code
 * modular and clean.
 */

interface AuthenticatableAdmin extends Authenticatable {

    role: 'admin' | 'superadmin';
}
/**
 * `Type Guard` is a technique used to determine the specific type of variable
 * within a union type at runtime. This allows you to apply conditional logic
 * based on the actual structure or identity of the data.
 */

type FileSource = { path: string };
const fileSource: FileSource = { path: 'some/path/to/file.csv' };

type DBSource = { connectionURL: string };
const dbSource: DBSource = { connectionURL: 'some-connection-url' };

type Source = FileSource | DBSource;

/**
 * One common type guard technique is checking for the existence of a property
 * using the `in` operator. This allows distinguishing between different object shapes
 * when they share no common discriminant.
 */

function loadData(source: Source) {

    if ('path' in source) {

        //source is a FileSource type
        return;
    }

    //source is a DBSource type
    return;
}

/**
 * Another formalized way to implement type guards is through `Discriminated Unions`,
 * by introducing a shared literal property in all types in a union.
 * By inspecting the value of this common field, it's possible
 * to accurately identify which type is being dealt with.
 */

type FileSourceDiscriminated = { type: 'file', path: string };
const fileSourceDiscriminated: FileSourceDiscriminated = {
    type: 'file',
    path: 'some/path/to/file.csv'
};

type DBSourceDiscriminated = { type: 'db', connectionURL: string };
const dbSourceDiscriminated: DBSourceDiscriminated = {
    type: 'db',
    connectionURL: 'some-connection-url'
};

type SourceDiscriminated = FileSourceDiscriminated | DBSourceDiscriminated;

function loadDataDiscriminated(source: SourceDiscriminated) {

    if (source.type === 'file') {

        //source is a FileSourceDiscriminated type
        return;
    }

    //source is a DBSourceDiscriminated type
    return;
}

/**
 * When working with classes, type guards can also be implemented using the `instanceof` operator.
 * This operator checks whether a value is an instance of a specific class constructor,
 * allowing branching logic and access to class-specific properties or methods.
 */

class User {

    constructor(public name: string) {}
}

class Admin {

    constructor(public permissions: string[]) {}
}

const user = new User('Max');
const admin = new Admin(['ban', 'restore']);

type Entity = User | Admin

function init(entity: Entity) {

    if (entity instanceof User) {

        //entity is an instance of User class
        return;
    }

    //entity is an instance of Admin class
    return;
}

/**
 * Type guards can also be abstracted into reusable helper functions that return boolean values.
 *
 * These functions encapsulate the type-checking logic and improve readability,
 * while still benefiting from TypeScript's automatic type narrowing based on return values.
 */

function isFile(source: SourceDiscriminated) {return source.type === 'file';}

function loadDataOutsourcing(source: SourceDiscriminated) {

    if (isFile(source)) {

        //source is a FileSourceDiscriminated type
        return;
    }

    //source is a DBSourceDiscriminated type
    return;
}
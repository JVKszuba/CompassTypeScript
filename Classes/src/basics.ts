/**
 * The `Class` keyword is used to define properties and methods that belong to instances of a specific object.
 * By default, properties are public, which means they can be accessed from outside the class.
 * The values are initialized inside the constructor using `this`.
 */

class User {

    name: string;
    age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
}

/**
 * To initialize a new instance, you need to use the keyword `New` follow by the class you want to create an instance
 * and passing the parameters defined in one of the constructors methods.
 */

const max = new User('Max', 35);
const fred = new User('Fred', 20);

/**
 * Exist some keywords that modify the visibility control of class members.
 * The most common modifiers are:
 *
 * - `public`: members can be accessed from anywhere.
 * - `private`: members can only be accessed within the class itself.
 *
 * Exists a convenient syntax to declare and initialize properties
 * directly in the constructor parameter list by prefixing them with a modifier.
 * This is commonly referred to as the "constructor shortcut".
 */

class UserShortcut {

    public hobbies: string[] = [];

    // Both `name` and `age` are declared and initialized automatically
    constructor(public name: string, private age: number) {}

    greet(): void {console.log(`Hello from ${this.name}, ${this.age}, my hobbies: ${this.hobbies}!`);}
}

const john = new UserShortcut('John', 20);

john.name = 'John Smith';
john.hobbies = ['cooking', 'dancing'];
//john.age = 22 //Error: Property 'age' is private and only accessible within class 'UserShortcut'

john.greet();

/**
 * In addition to controlling access, you can also mark properties as `readonly`.
 * This property is useful when you want to ensure certain data remains constant after initialization,
 * but can be accessed from everywhere.
 */

class UserDate {

    public readonly date: string;

    constructor(date: string, public name: string) {this.date = date;}
}

const maxDate = new UserDate('02/02/2000', 'Max');

maxDate.name = 'Maximilian';
//maxDate.date = '20/02/2000' //Error: Cannot assign to 'date' because it is a read-only property.
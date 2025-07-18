/**
 * The classes can include getter and setter methods.
 *
 * - A `get` method is used to access or compute a property value in a read-like manner.
 * - A `set` method is used to update or assign a new value to an internal property.
 *
 * These methods provide a clean way to expose controlled access to internal values,
 * while keeping encapsulation.
 */

class UserGetterSetter {

    constructor(private firstName: string, private lastName: string) {}

    get fullName() {return this.firstName +  ' ' + this.lastName;}

    set fullName(fullName: string) {

        let splitName = fullName.split(' ');

        this.firstName = splitName[0];
        this.lastName = splitName[1];
    }
}

const carl = new UserGetterSetter('Carl', 'Doe');
console.log(carl.fullName);

carl.fullName = 'Carl Smith';
console.log(carl.fullName);

/**
 * In addition to instance members, classes can also define `static` members.
 * Static properties or methods belong to the class itself, not to any instance,
 * being accessed directly through the class name.
 * They are useful for shared values or utility functions that do not
 * rely on instance-specific data.
 */

class UserStatic {

    static classId = 'USER'

    constructor(public name: string, public age: number) {}
}

console.log(UserStatic.classId);

/**
 * Classes also supports inheritance using the `extends` keyword.
 * The child class inherits the properties and methods of its parent,
 * but can also define its own members or override the inherited ones.
 * The `super` keyword is used to call the parent class constructor during initialization.
 */

class Employee extends UserGetterSetter {

    constructor(public jobTitle: string, firstName: string, lastName: string) {super(firstName, lastName);}
}

const maxEmployee = new Employee('builder', 'Max', 'Smith')
console.log(maxEmployee.fullName);

/**
 * Another important access modifier is `protected`. Parameters or methods protected
 * can be accessed within the class and its subclasses, but not from outside the class hierarchy.
 * This is useful when child classes need access to some internal data
 * that shouldn't be exposed to the rest of the code.
 */

class UserProtected {

    constructor(protected name: string, protected age: number) {}
}

class EmployeeProtected extends UserProtected {

    constructor(private jobTitle: string, name: string, age: number) {super(name, age);}

    get employeeFull() {return this.name +  ', ' + this.age + ', ' + this.jobTitle}
}

const maxEmployeeProtected = new EmployeeProtected('builder', 'Max', 35)
console.log(maxEmployeeProtected.employeeFull);

/**
 * An `abstract` class cannot be instantiated directly, but serves as a base class for other
 * classes to extend from. This type of class often contains shared logic and enforces structure
 * by defining abstract methods that subclasses must implement.
 */

abstract class UIElement {

    protected constructor(public identifier: string) {}

    clone(targetLocation: string) {

        //Logic to duplicate the UI element
    }
}

class SideDrawerElement extends UIElement {

    constructor(public identifier: string, public position: 'left' | 'right') {super(identifier);}
}

const leftDrawer = new SideDrawerElement('1', 'left')
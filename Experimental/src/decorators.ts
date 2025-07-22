/**
 * Enables support for decorators in TypeScript when the experimentalDecorators compiler option is enabled.
 * The `Experimental Decorators` feature allows annotation and meta-programming syntax for class declarations and members.
 */

function Logger(logString: string) {

    return function(constructor: Function) {

        console.log(logString);
        console.log(constructor);
    }
}

@Logger("Logging - Person")
class PersonLogger {

    name = 'Max';

    constructor() { console.log("Creating person object..."); }
}

const personLogger = new PersonLogger();
console.log(personLogger);

/**
 * `Property Decorator` are declared just before a property declaration.
 * Used to observe or modify property metadata, but cannot directly change the property's initializer.
 */

function Log(target: any, propertyName: string | Symbol) {

    console.log("Property Decorator");
    console.log(target, propertyName);
}

/**
 * `Accessor Decorator` are applied to getters or setters.
 * Allows inspection or modification of the property descriptor.
 */

function Log2(target: any, propertyName: string, descriptor: PropertyDescriptor) {

    console.log("Accessor Decorator");
    console.log(target, propertyName, descriptor);
}

/**
 * `Method Decorator` are applied to class methods.
 * Can be used to modify method behavior or metadata by accessing the method's descriptor.
 */

function Log3(target: any, propertyName: string | Symbol, descriptor: PropertyDescriptor) {

    console.log("Method Decorator");
    console.log(target, propertyName, descriptor);
}

/**
 * `Parameter Decorator` are declared before a method parameter.
 * Used to log or inspect metadata about the parameter, such as its position in the method signature.
 */

function Log4(target: any, name: string | Symbol, position: number) {

    console.log("Parameter Decorator");
    console.log(target, name, position);
}

class Product {

    @Log
    title: string;
    private _price: number;

    constructor(title: string, price: number) {

        this.title = title;
        this._price = price;
    }

    @Log2
    set price(value: number) {

        if (value > 0) {this._price = value;}
        else throw new Error("Invalid input: value need to be positive");
    }

    @Log3
    getPriceWithTax(@Log4 tax: number): number {return this.price * (1 + tax); }
}

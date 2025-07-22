/**
 * The `Class Decorator` allows you to annotate and modify class declarations.
 * Can return a new constructor to replace or extend the original one.
 */

function logger<T extends new (...args: any[]) => any>(target: T, context: ClassDecoratorContext): any {

    console.log("Logger decorator");
    console.log(target);
    console.log(context);

    return class extends target {

        constructor(...args: any[]) {

            super(...args);
            console.log('Class constructor');
        }
    };
}

@logger
class PersonClass {

    name = 'Max'

    greet() { console.log('Hi, I am ' + this.name); }
}

const maxClass = new PersonClass();
console.log(maxClass);


/**
 * The `Method Decorator` is applied to methods within a class to observe, modify, or replace them.
 * Commonly used for binding, logging, or permission checks.
 */

function autoBind(target: Function, context: ClassMethodDecoratorContext) {

    context.addInitializer(function(this: any) {this[context.name] = this[context.name].bind(this);});
}

class PersonMethod {

    name = 'Max'

    @autoBind
    greet() { console.log('Hi, I am ' + this.name); }
}

const maxMethod = new PersonMethod();
const greet = maxMethod.greet;
greet();


/**
 *
 * The `Field Decorator` is applied to class properties to intercept and optionally replace their initial value.
 * Can be used for logging, transformation, or enforcing constraints.
 */

function fieldLogger(target: undefined, context: ClassFieldDecoratorContext) {

    console.log(target);
    console.log(context);

    return (initialValue: any) => {
        console.log(initialValue);
        return '';
    };
}

class PersonField {

    @fieldLogger
    name = 'Max'

    greet() {console.log('Hi, I am ' + this.name);}
}

const maxField = new PersonField();
console.log(maxField);


/**
 * `Decorator Factory` is a function that returns a decorator.
 * Used to create reusable and configurable decorators.
 */

function replacer<T>(initialValue: T) {

    return function fieldLogger(target: undefined, context: ClassFieldDecoratorContext) {

        return () => {return '';};
    }
}

class PersonFactory {

    @replacer('')
    name = 'Max'

    greet() { console.log('Hi, I am ' + this.name); }
}

const maxFactory = new PersonFactory();
console.log(maxFactory);
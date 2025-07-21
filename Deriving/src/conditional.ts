/**
 * You can define types conditionally — meaning that the resulting
 * type depends on a condition. If the condition is true, one type
 * is used; if not, a different type is used.
 */

type StringArray = string[];

type GetElementType<T> = T extends any[] ? T[number] : never;

type Example1 = GetElementType<StringArray>;

let text = 'Hi'
type Example2 = GetElementType<typeof text>;

/**
 * `Conditional Types` are also useful when the return type of a function
 * depends on the structure of the input type — especially when the compiler
 * cannot infer it clearly.
 */

type FullnamePerson = { firstName: string; lastName: string };
type FullnameOrNothing<T> = T extends FullnamePerson ? string : never

function getFullname<T extends object>(person: T): FullnameOrNothing<T> {

    if ('firstName' in person && 'lastName' in person && person.firstName && person.lastName) {

        return `${person.firstName} ${person.lastName}` as FullnameOrNothing<T>;
    }

    throw new Error('Invalid person: no first name and/or lastName');
}

const name1 = getFullname({});
const name2 = getFullname({firstName: 'John', lastName: 'Doe'});


/**
 * `Function Overloads` provide a way to define multiple signatures for the same function.
 * When a function can accept different types of parameters and return different types
 * depending on the input, each overload will define a specific combination of parameter
 * types and expected return type.
 */

function getLength(val: any[]): number
function getLength(val: string): string

function getLength(val: string | any[]) {

    if (typeof val === 'string') {

        const numberOfWords = val.split(' ').length;

        return `${numberOfWords} words`;
    }

    return val.length;
}

const numOfWords = getLength('Dois this work?')
const numItens = getLength(['Sports', 'Cookies'])
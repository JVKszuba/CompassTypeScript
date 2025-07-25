/**
 * TypeScript allows using plain JavaScript libraries, but for full type support,
 * you must install the corresponding type definitions, often available via `DefinitelyTyped`.
 */

import _ from 'lodash';

const numbers = [1, 2, 3, 4, 5];

const chunkedArray = _.chunk(numbers, 2);
console.log(chunkedArray);

/**
 * But you also can use libraries made for TypeScript, like `Zod`.
 * This TypeScript-first schema is a declaration and validation library, providing
 * built-in types without the need for separate type installations.
 */

import fs from 'node:fs';
import * as z from 'zod';

const dataSchema = z.object({
    title: z.string(),
    id: z.number(),
    values: z.array(z.string()),
});

type Data = z.infer<typeof dataSchema>;

function output(data: Data): void {console.log(data);}

const content = JSON.parse(fs.readFileSync('data.json').toString());

const parsedData = dataSchema.parse(content);
output(parsedData);

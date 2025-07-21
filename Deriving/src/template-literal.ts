/**
 * You can use `Template Literal Types` to create new string literal types
 * by combining other string literal types into fixed string patterns.
 */

type ReadPermissions = 'no-read' | 'read';
type WritePermissions = 'no-write' | 'write';

type FilePermissions = `${ReadPermissions}-${WritePermissions}`;

/**
 * You can also use template literal types to dynamically construct
 * property names based on existing keys in a type.
 */

type DataFile = {
    data: string;
    permissions: FilePermissions;
}

type DataFileEventNames = `${keyof DataFile}Changed`;

type DataFileEvents = { [Key in DataFileEventNames]: () => void; }
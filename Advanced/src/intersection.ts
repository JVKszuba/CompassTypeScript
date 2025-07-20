/**
 * If you want to compose new types by combining multiple existing ones,
 * you can use a feature called `Intersection Types`. This approach merges all
 * the properties from the given types to one, allowing to build more specific
 * types based on reusable building blocks.
 */

type FileData = {

    path: string;
    content: string;
}

type DatabaseData = {

    connectionUrl: string;
    credentials: string;
}

type Status = {

    isOpen: boolean;
    errorMessage?: string;
}

type AccessedFileData = FileData & Status;
type AccessedDatabase = DatabaseData & Status;


/**
 * Intersection types are also compatible with interfaces, but you need to use
 * the `extends` keyword to inherit from other interfaces.
 * This achieves the same result as type intersections, allowing reuse of common structures.
 */

interface FileDataInterface {

    path: string;
    content: string;
}

interface StatusInterface {

    isOpen: boolean;
    errorMessage?: string;
}

interface AccessedFileDataInterface extends FileData, Status {}
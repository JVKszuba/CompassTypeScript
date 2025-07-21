/**
 * You can use `Index-Access` types to extract the type of specific
 * property from a more complex object or structure.
 */

type AppUser = {
    name: string;
    age: number;
    permissions: {
        id: string;
        title: string;
        description: string;
    } []
}

type Perms = AppUser['permissions'];

/**
 * When the indexed type is an array, you can use `[number]` to extract
 * the type of a single item within that array.
 */

type Perm = Perms[number];

type Names = string[];
type Name = Names[number];
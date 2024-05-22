import { CustomError } from "./CustomError";


export class DatabaseError extends CustomError {

    StatusCode = 500;
    constructor() {
        super('db error');
        Object.setPrototypeOf(this, DatabaseError.prototype);
    }
    serialize(): { message: string} {
        return { message: 'db error'};
    }
}
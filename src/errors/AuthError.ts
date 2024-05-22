import { CustomError } from "./CustomError";


export class AuthError extends CustomError {

    StatusCode = 401;
    constructor() {
        super("user not authenticated");
        Object.setPrototypeOf(this, AuthError.prototype);
    }
    serialize(): { message: string} {
        return { message: "user not authenticated"}
    }
}
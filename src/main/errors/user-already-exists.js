class UserAlreadyExists extends Error {
    constructor (message) {
        super(message);

        this.name = this.constructor.name;

        Error.captureStackTrace(this, this.constructor);

        this.status = 409;
    }
}

export default UserAlreadyExists;
class User {
    constructor(username, firstName, lastName, email) {
        this.username = username || null;
        this.firstName = firstName || null;
        this.lastName = lastName || null;
        this.email = email || null;
    }
}

export default User;
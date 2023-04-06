import logger from '../utils/logger.js';
import UserAlreadyExists from '../errors/user-already-exists.js';

export async function authenticate(kcAdminClient) {
    await kcAdminClient.auth({
    username: 'admin',
    password: 'test',
    grantType: 'password',
    clientId: 'testclient',
    clientSecret: 'qmBKfFvrcxnrXQIWBVVYrBt5jlILe48C'
    }).catch(err=> {
        console.log(err);
    });
}

export async function getAllUsers(kcAdminClient) {
    let allUsers = await kcAdminClient.users.find();
    return allUsers;
}

export async function createUser(kcAdminClient, user) {
    return await kcAdminClient.users.create({
            realm: 'test',
            username: user.username,
            email: user.email,
        }).catch(err => {
            if(err.response.status == 409) {
                logger.error(err.response.status + " " + err.response.data.errorMessage);
                throw new UserAlreadyExists(err.response.data.errorMessage);
            }
            throw new Error('BROKEN');
        });
}
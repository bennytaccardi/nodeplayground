import KcAdminClient from '@keycloak/keycloak-admin-client';

let kcAdminClient;

export async function initAdminService() {
    kcAdminClient = new KcAdminClient({
        realmName: 'test',
        baseUrl: 'http://localhost:8089/auth'
    });
}

export async function authenticate() {
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

export async function getAllUsers() {
    let allUsers = await kcAdminClient.users.find();
    return allUsers;
}

export async function createUser(user) {
    await kcAdminClient.users.create({
            realm: 'test',
            username: user.username,
            email: user.email,
        }).catch(err => {
            throw new Error('BROKEN');
    });
}
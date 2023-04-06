import session from 'express-session';
import Keycloak from 'keycloak-connect';
import KcAdminClient from '@keycloak/keycloak-admin-client';

let _keycloak;

var keycloakConfig = {
    clientId: 'testclient',
    bearerOnly: true,
    serverUrl: 'http://localhost:8089/auth',
    realm: 'test',
    credentials: {
        secret: 'qmBKfFvrcxnrXQIWBVVYrBt5jlILe48C'
    }
};

async function initKeycloak() {
    console.log("Initializing...");
    if (_keycloak) {
        console.warn("Trying to init Keycloak again!");
        return _keycloak;
    } 
    else {
        console.log("Initializing Keycloak...");
        var memoryStore = new session.MemoryStore();
        _keycloak = new Keycloak({ store: memoryStore }, keycloakConfig);
        return _keycloak;
    }
}

async function initAdminKeycloak() {
    return new KcAdminClient({
        realmName: 'test',
        baseUrl: 'http://localhost:8089/auth'
    });
}

export {
    initKeycloak,
    initAdminKeycloak
};
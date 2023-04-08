import session, { MemoryStore } from 'express-session';
import Keycloak from 'keycloak-connect';
import KcAdminClient from '@keycloak/keycloak-admin-client';

let _keycloak;

var keycloakConfig = {
    clientId: 'testclient',
    bearerOnly: true,
    // serverUrl: 'http://keycloak:8100/auth',
    serverUrl: 'http://localhost:8089/auth',
    realm: 'test',
    credentials: {
        secret: 'qmBKfFvrcxnrXQIWBVVYrBt5jlILe48C'
    }
};

async function initKeycloak(memoryStore = null) {
    console.log("Initializing...");
    if (_keycloak) {
        console.warn("Trying to init Keycloak again!");
        return _keycloak;
    } 
    else {
        console.log("Initializing Keycloak...");
        _keycloak = new Keycloak({ store: memoryStore }, keycloakConfig);
        return _keycloak;
    }
}

async function getKeycloak() {
    if(_keycloak)
        return _keycloak;
    return null;
}
async function initAdminKeycloak() {
    return new KcAdminClient({
        realmName: 'test',
        // baseUrl: 'http://keycloak:8100/auth'
        baseUrl: 'http://localhost:8089/auth'
    });
}

const store = new session.MemoryStore();
_keycloak = await initKeycloak(store);

export {
    initAdminKeycloak,
    _keycloak,
    store
};
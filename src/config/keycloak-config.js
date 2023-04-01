import session from 'express-session';
import Keycloak from 'keycloak-connect';

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

function initKeycloak() {
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

function getKeycloak() {
    if (!_keycloak){
        console.log("Keycloak is not initialized. Initialized it before");
    } 
    return _keycloak;
}

export {
    initKeycloak,
    getKeycloak
};
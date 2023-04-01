import express from 'express';
import { getKeycloak } from '../config/keycloak-config.js';

const router = express.Router();

export async function initTestController() {
    const keycloak = getKeycloak();

    router.get('/anonymous', function(req, res){
        res.send("Hello Anonymous");
    });

    router.get('/user', keycloak.protect('user'), function(req, res){
        res.send("Hello User");
    });

    router.get('/admin', keycloak.protect('admin'), function(req, res){
        res.send("Hello Admin");
    });

    router.get('/all-user', keycloak.protect(['user','admin']), function(req, res){
        res.send("Hello All User");
    });
    return router;
}

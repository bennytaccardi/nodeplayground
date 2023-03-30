var express = require('express');
var router = express.Router();
const keycloak = require('../config/keycloak-config.ts').getKeycloak();
import KcAdminClient from 'keycloak-admin';

router.get('/anonymous', function(req: any, res: { send: (arg0: string) => void; }){
    res.send("Hello Anonymous");
});

router.get('/user', keycloak.protect('user'), function(req: any, res: { send: (arg0: string) => void; }){
    res.send("Hello User");
});

router.get('/admin', keycloak.protect('admin'), function(req: any, res: { send: (arg0: string) => void; }){
    res.send("Hello Admin");
});

router.get('/all-user', keycloak.protect(['user','admin']), function(req: any, res: { send: (arg0: string) => void; }){
    res.send("Hello All User");
});

module.exports = router;
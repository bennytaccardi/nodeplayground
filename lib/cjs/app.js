"use strict";
var express = require('express');
var app = express();
const keycloak = require('./config/keycloak-config.ts').initKeycloak();
app.use(keycloak.middleware());
const testController = require('./controller/test-controller.js');
app.use('/test', testController);
app.get('/', function (req, res) {
    res.send("Server is up!");
});
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

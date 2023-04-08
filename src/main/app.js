import express from 'express';
import session from 'express-session';
import { _keycloak, store } from './config/keycloak-config.js';
// import adminControllerRouter from './admin/admin-controller.js';
import bodyParser from 'body-parser';
import logger from './utils/logger.js';

const keycloak = _keycloak;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
   secret: 'qmBKfFvrcxnrXQIWBVVYrBt5jlILe48C',
   resave: false,
   saveUninitialized: true,
   store: store
 }));
 
app.use(keycloak.middleware());

// app.use('/admin', adminControllerRouter);

app.get('/', keycloak.protect('admin'), function(req, res){
   res.send("Server is up!");
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
import express from 'express';
import session from 'express-session'
import { initKeycloak } from './config/keycloak-config.js';
import adminControllerRouter from './admin/admin-controller.js';
import bodyParser from 'body-parser';
import logger from './utils/logger.js';

const memoryStore = new session.MemoryStore();
const keycloak = await initKeycloak();
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
   secret: 'qmBKfFvrcxnrXQIWBVVYrBt5jlILe48C',
   resave: false,
   saveUninitialized: true,
   store: memoryStore
 }));
app.use(keycloak.middleware());

app.use('/admin', adminControllerRouter);

app.get('/', function(req, res){
   res.send("Server is up!");
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
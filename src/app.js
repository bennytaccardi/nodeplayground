import express from 'express';
import session from 'express-session'
import { initKeycloak } from './config/keycloak-config.js';
// import { initTestController } from './controller/test-controller.js';
// import testControllerRouter from './controller/test-controller.js';
import adminControllerRouter from './admin/admin-controller.js';
import bodyParser from 'body-parser';

var memoryStore = new session.MemoryStore();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
   secret: 'qmBKfFvrcxnrXQIWBVVYrBt5jlILe48C',
   resave: false,
   saveUninitialized: true,
   store: memoryStore
 }));

const keycloak = initKeycloak();
app.use(keycloak.middleware());


// const testControllerRouter = await initTestController();
// app.use('/test', testControllerRouter);

// const adminControllerRouter = await initAdminController();
app.use('/admin', adminControllerRouter);

app.get('/', function(req, res){
   res.send("Server is up!");
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
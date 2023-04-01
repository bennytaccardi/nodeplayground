import express from 'express';
import { initAdminService, authenticate, getAllUsers, createUser } from './admin-service.js';
import { getKeycloak, initKeycloak } from '../config/keycloak-config.js';
import User from '../user/user.js';

const router = express.Router();
await initAdminService();

const keycloak = initKeycloak();

router.get('/get-all-users', keycloak.protect('admin'), async (req, res) => {
    await authenticate();
    let allUsers = await getAllUsers();
    res.send(allUsers);
});

router.post('/create-user', keycloak.protect('admin'), async (req, res) => {
    await authenticate();

    const requestedUser = req.body;
    const tmpUser = new User(requestedUser.username, requestedUser.firstName, requestedUser.lastName, requestedUser.email);

    await createUser(tmpUser);
    res.send('OK');
});

export default router;

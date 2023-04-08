import express from 'express';
import { authenticate, getAllUsers, createUser } from './admin-service.js';
import { initAdminKeycloak, _keycloak } from '../config/keycloak-config.js';
import User from '../user/user.js';
import logger from '../utils/logger.js';

const router = express.Router();
const keycloak = _keycloak;
const kcAdminClient = await initAdminKeycloak();

router.get('/get-all-users', _keycloak.protect('admin'), async (req, res) => {
    console.log(kcAdminClient);
    await authenticate(kcAdminClient);
    let allUsers = await getAllUsers(kcAdminClient);
    res.send(allUsers);
});

router.post('/create-user', keycloak.protect('admin'), async (req, res) => {
    await authenticate(kcAdminClient);

    const requestedUser = req.body;
    const tmpUser = new User(requestedUser.username, requestedUser.firstName, requestedUser.lastName, requestedUser.email);

    try {
        const created_user = await createUser(tmpUser);
        return res.send(created_user);
    } catch (err) {
        logger.info(err);
        return res.status(err.status).send(err.message);
    }
});

export default router;

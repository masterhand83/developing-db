const express = require('express');
const router = express.Router();

const user = require('../controllers/user.controller');

router.get('/user', user.getUsers);
router.post('/user', user.createUser);
router.get('/user/:id', user.getUser);
router.get('/project/:id', user.getUserProjects);
router.post('/project/:id', user.addProjectToUser)
router.put('/user/:id', user.editUser);
router.delete('/user/:id', user.deleteUser);
router.post('/login', user.login);

module.exports = router;
const express = require('express');
const router = express.Router();

const user = require('../controllers/user.controller');

router.get('/user', user.getUsers);
router.post('/user', user.createUser);
router.get('/user/:id', user.getUser);
router.get('/project/:id', user.getUserProjects);
router.put('/user/:id', user.editUser);
router.delete('/user/:id', user.deleteUser);
router.post('/login', user.login);
router.get('/residents', user.getResidents);
router.get('/designers', user.getDesigners);

module.exports = router;
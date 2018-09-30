const express = require('express');
const router = express.Router();

const project = require('../controllers/project.controller');

router.get('/project/', project.getProjects);
router.post('/project/', project.createProject);
router.get('/project/:id', project.getProject);
router.get('/user/:id', project.getUsersInCharge);
router.put('/project/:id', project.editProject);
router.delete('/project/:id', project.deleteProject);

module.exports = router;
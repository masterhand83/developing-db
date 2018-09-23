const express = require('express');
const router = express.Router();

const project = require('../controllers/project.controller');

router.get('/', project.getProjects);
router.post('/', project.createProject);
router.get('/:id', project.getProject);
router.put('/:id', project.editProject);
router.delete('/:id', project.deleteProject);

module.exports = router;
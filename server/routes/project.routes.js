const express = require('express');
const router = express.Router();

const project = require('../controllers/project.controller');

router.put('/resident/:id', project.changeResidentInCharge);
router.put('/designer/:id', project.changeDesignerInCharge);
router.get('/alert/:id', project.getAlertsProject)
router.put('/alert/:id', project.activateProjectAlerts);
router.get('/message/:id',project.getMessagesProject);
router.post('/message/:id',project.addMessageToProject);
router.put('/activity/:id', project.addActivityToProject);
router.get('/project/', project.getProjects);
router.post('/project/', project.createProject);
router.get('/project/:id', project.getProject);
router.put('/project/:id', project.editProject);
router.delete('/project/:id', project.deleteProject);
router.get('/activity/:id', project.getActivitiesProject);

module.exports = router;
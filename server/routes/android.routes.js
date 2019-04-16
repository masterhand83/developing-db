const express = require('express');
const router = express.Router();

const user = require('../controllers/user.controller');
const alert = require('../controllers/alert.controller');
const activity = require('../controllers/activity.controller');

router.post('/login', user.loginAndroid);//Checked
router.post('/alerts', alert.getProjectAlerts);//Checked
router.get('/comment/:id', activity.getCommentsAndroid);//Checked
router.put('/priority/:id', activity.changePriorityAndroid);//Checked

module.exports = router;
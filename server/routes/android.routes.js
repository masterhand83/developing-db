const express = require('express');
const router = express.Router();

const user = require('../controllers/user.controller');
const alert = require('../controllers/alert.controller');

router.post('/login', user.loginAndroid);//Checked
router.post('/alerts', alert.getProjectAlerts);//Checked

module.exports = router;
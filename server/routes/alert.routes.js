const express = require('express');
const router = express.Router();

const alert = require('../controllers/alert.controller');

router.delete('/alert/:id', alert.deleteAlert);

module.exports = router;
const express = require('express');
const router = express.Router();

const crypto = require('../controllers/crypto.controller');

router.post('/encrypt', crypto.encrypt);
router.post('/decrypt', crypto.decrypt);

module.exports = router;
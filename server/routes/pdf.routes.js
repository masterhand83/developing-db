const express = require('express');
const router = express.Router();

const pdf = require('../controllers/pdf.controller');

router.post('/pdf/:id', pdf.createPDF);//Checked

module.exports = router;
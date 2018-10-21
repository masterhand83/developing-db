const express = require('express');
const router = express.Router();

const activity = require('../controllers/activity.controller');

router.get('/activity', activity.getActivities);
router.post('/activity', activity.createActivity);
router.get('/activity/:id', activity.getActivity);
router.put('/activity/:id', activity.editActivity);
router.delete('/activity/:id', activity.deleteActivity);

module.exports = router;
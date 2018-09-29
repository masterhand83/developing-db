const express = require('express');
const router = express.Router();

const activity = require('../controllers/activity.controller');

router.get('/', activity.getActivities);
router.post('/', activity.createActivity);
router.post('/newproject', activity.createActivitiesForNewProject);
router.get('/:id', activity.getActivity);
router.put('/:id', activity.editActivity);
router.delete('/:id', activity.deleteActivity);

module.exports = router;
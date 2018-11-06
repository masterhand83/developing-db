const express = require('express');
const router = express.Router();

const activity = require('../controllers/activity.controller');

router.get('/activity/:id', activity.getActivity);
router.put('/activity/:id', activity.editActivity);
router.delete('/activity/:id', activity.deleteActivity);
router.get('/comment/:id', activity.getComments);
router.post('/comment/:id', activity.addComment);
router.put('/objective/:id', activity.addObjective);
router.put('/deliverable/:id', activity.addDeliverable);
router.put('/priority/:id', activity.editPriority);

module.exports = router;
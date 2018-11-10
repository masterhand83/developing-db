const express = require('express');
const router = express.Router();

const activity = require('../controllers/activity.controller');

router.get('/activity/:id', activity.getActivity);
router.delete('/activity/:id', activity.deleteActivity);
router.put('/start/:id', activity.startActivity);
router.put('/verifyDeliverables/:id', activity.verifyDeliverables);
router.put('/verifyObjectives/:id', activity.verifyObjectives);
router.put('/finish/:id', activity.finishActivity);
router.put('/startdate/:id', activity.changeStartDateActivity);
router.put('/enddate/:id', activity.changeEndDateActivity);
router.get('/comment/:id', activity.getComments);
router.post('/comment/:id', activity.addComment);
router.put('/objective/:id', activity.addObjective);
router.put('/deliverable/:id', activity.addDeliverable);
router.put('/priority/:id', activity.editPriority);

module.exports = router;
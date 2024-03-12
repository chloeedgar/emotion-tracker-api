const express = require('express');
const { body } = require('express-validator');
const snapshotController = require('../controllers/snapshotController');
const requireAuth = require('../middleware.js')

const snapshotRouter = express.Router();

// add auth back in after testing*******************
snapshotRouter.get('/contextualTriggers', snapshotController.getAllContextualTriggers);
snapshotRouter.post('/', snapshotController.createSnapshot);
snapshotRouter.get('/users/:userId', snapshotController.getAllSnapshotsByUserId);
snapshotRouter.get('/:snapshotId', snapshotController.getSnapshotById);
snapshotRouter.patch('/:snapshotId', snapshotController.updateSnapshotById);
snapshotRouter.delete('/:snapshotId', snapshotController.deleteSnapshotById);
snapshotRouter.get('/:snapshotId/contextualTriggers', snapshotController.getContextualTriggersBySnapshotId);


module.exports = snapshotRouter;
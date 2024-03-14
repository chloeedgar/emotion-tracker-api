const express = require('express');
const snapshotController = require('../controllers/snapshotController');
const snapshotRouter = express.Router();
const requireAuth = require('../middleware/auth'); 

// Route for getting all contextual triggers
snapshotRouter.get('/contextualTriggers', snapshotController.getAllContextualTriggers);

// Route for creating a snapshot 
snapshotRouter.post('/', requireAuth, snapshotController.createSnapshot);

// Route for getting all snapshots created by user
snapshotRouter.get('/users/:userId', requireAuth, snapshotController.getAllSnapshotsByUserId);

// Route for getting a snapshot by snapshotId
snapshotRouter.get('/:snapshotId', requireAuth, snapshotController.getSnapshotById);

// Route for updating a snapshot by snapshotId
snapshotRouter.patch('/:snapshotId', requireAuth, snapshotController.updateSnapshotById);

// Route for deleting a snapshot by snapshotId
snapshotRouter.delete('/:snapshotId', requireAuth, snapshotController.deleteSnapshotById);

// Route for getting the contextual triggers associated with a snapshot using the snapshotId
// did not end up needing in web app
snapshotRouter.get('/:snapshotId/contextualTriggers', requireAuth, snapshotController.getContextualTriggersBySnapshotId);



module.exports = snapshotRouter;
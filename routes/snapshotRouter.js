const express = require('express');
const { body } = require('express-validator');
const snapshotController = require('../controllers/snapshotController');
// const { isAuthenticated, isAuthorized } = require('../middleware.js');
// const { verifyToken } = require('../middleware.js'); 
const snapshotRouter = express.Router();
const { isAuth } = require('./../middleware/auth');


// add auth back in after testing*******************
snapshotRouter.get('/contextualTriggers', snapshotController.getAllContextualTriggers);
 snapshotRouter.post('/', isAuth, snapshotController.createSnapshot);
 snapshotRouter.get('/users/:userId', snapshotController.getAllSnapshotsByUserId); //add is auth back
 snapshotRouter.get('/:snapshotId', snapshotController.getSnapshotById);
 snapshotRouter.patch('/:snapshotId', snapshotController.updateSnapshotById);
 snapshotRouter.delete('/:snapshotId', snapshotController.deleteSnapshotById);
 snapshotRouter.get('/:snapshotId/contextualTriggers', snapshotController.getContextualTriggersBySnapshotId);

//snapshotRouter.post('/', isAuth,snapshotController.createSnapshot);


module.exports = snapshotRouter;
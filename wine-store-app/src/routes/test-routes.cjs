
/**
@fileoverview Test static route endpoints.

@author Giordano de Brito
@version 1.0.0
@date 2025-09-23
@description: Here lies some testing routes for the endpoint
and in-between services.
*/

const { Router } = require('express');
const router = Router();

const TestController = require('../controllers/test-controller.cjs');

router.get('/test/message', TestController.messageSender);
router.get('/test/backend/version', TestController.backendVersion);

module.exports = router;

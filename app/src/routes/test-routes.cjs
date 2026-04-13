
const { Router } = require('express');
const router = Router();

const TestController = require('../controllers/test-controller.cjs');

router.get('/test/message', TestController.messageSender);
router.get('/test/backend/version', TestController.backendVersion);

module.exports = router;

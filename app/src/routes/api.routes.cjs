
const { Router } = require('express');
const router = Router();

const ApiController = require('../controllers/api.controller.cjs');

router.get('/api/v1/time', ApiController.time);
router.get('/api/v1/user/login', ApiController.login);

module.exports = router;

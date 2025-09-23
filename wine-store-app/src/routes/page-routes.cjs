
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

const HomeController = require('../controllers/home-controller.cjs');
const authMiddleware = require('../middleware/auth.cjs');

router.get('/', authMiddleware, HomeController.index);

module.exports = router;

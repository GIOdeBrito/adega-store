

const { Router } = require('express');
const router = Router();

const HomeController = require('../controllers/home-controller.cjs');
const authMiddleware = require('../middleware/auth.cjs');

router.get('/', authMiddleware, HomeController.index);

module.exports = router;



const { Router } = require('express');
const router = Router();

const HomeController = require('../controllers/home-controller.cjs');
const authMiddleware = require('../middleware/auth.cjs');

router.get('/', authMiddleware, HomeController.index);
router.get('/about', authMiddleware, HomeController.about);
router.get('/store', authMiddleware, HomeController.store);

module.exports = router;

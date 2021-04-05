const { Router } = require('express')
const controller = require('../controllers')

// transform handler methods to async methods
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next))
    .catch(next)
}
const router = Router();

router.post('/save', asyncHandler(controller.saveUser));
router.post('/send', asyncHandler(controller.sendNotification));
router.get('/', asyncHandler(controller.healthCheck));
router.get('/health', asyncHandler(controller.healthCheck));

module.exports = router;

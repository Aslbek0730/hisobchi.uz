const express = require('express');
const { register, login, me, resetPassword } = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const { body } = require('express-validator');
const { validateRequest } = require('../middleware/validate');

const router = express.Router();

router.post(
  '/register',
  body('fullName').notEmpty().withMessage('Full name is required'),
  body('companyName').notEmpty().withMessage('Company name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 8 }).withMessage('Password min length is 8'),
  validateRequest,
  register
);
router.post(
  '/login',
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
  validateRequest,
  login
);
router.post('/reset-password', resetPassword);
router.get('/me', protect, me);

module.exports = router;

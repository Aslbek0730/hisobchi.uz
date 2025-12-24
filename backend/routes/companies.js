const express = require('express');
const { createCompany, getCompany } = require('../controllers/companyController');
const { protect, allowRoles } = require('../middleware/auth');
const { body } = require('express-validator');
const { validateRequest } = require('../middleware/validate');

const router = express.Router();

router.post(
  '/',
  protect,
  allowRoles('company_admin', 'super_admin'),
  body('name').notEmpty().withMessage('Company name is required'),
  validateRequest,
  createCompany
);
router.get('/:id', protect, allowRoles('super_admin', 'company_admin'), getCompany);

module.exports = router;

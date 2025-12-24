const express = require('express');
const {
  createEmployee,
  listEmployees,
  getEmployee,
  updateEmployee,
  removeEmployee
} = require('../controllers/employeeController');
const { protect, allowRoles } = require('../middleware/auth');
const { requireCompany } = require('../middleware/requireCompany');
const { body } = require('express-validator');
const { validateRequest } = require('../middleware/validate');

const router = express.Router();

router.post(
  '/',
  protect,
  requireCompany,
  allowRoles('company_admin'),
  body('fullName').notEmpty().withMessage('Full name is required'),
  body('position').notEmpty().withMessage('Position is required'),
  body('salary').isNumeric().withMessage('Salary must be a number'),
  body('workType')
    .isIn(['monthly', 'hourly'])
    .withMessage('Work type must be monthly or hourly'),
  validateRequest,
  createEmployee
);
router.get('/', protect, requireCompany, allowRoles('company_admin'), listEmployees);
router.get('/:id', protect, requireCompany, allowRoles('company_admin'), getEmployee);
router.put(
  '/:id',
  protect,
  requireCompany,
  allowRoles('company_admin'),
  body('fullName').notEmpty().withMessage('Full name is required'),
  body('position').notEmpty().withMessage('Position is required'),
  body('salary').isNumeric().withMessage('Salary must be a number'),
  body('workType')
    .isIn(['monthly', 'hourly'])
    .withMessage('Work type must be monthly or hourly'),
  validateRequest,
  updateEmployee
);
router.delete('/:id', protect, requireCompany, allowRoles('company_admin'), removeEmployee);

module.exports = router;

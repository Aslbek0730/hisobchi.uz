const express = require('express');
const {
  calculateSalaryRecord,
  listEmployeeSalaries,
  reportSalaries
} = require('../controllers/salaryController');
const { protect, allowRoles } = require('../middleware/auth');
const { requireCompany } = require('../middleware/requireCompany');
const { body, param, query } = require('express-validator');
const { validateRequest } = require('../middleware/validate');

const router = express.Router();

router.post(
  '/calculate',
  protect,
  requireCompany,
  allowRoles('company_admin'),
  body('employeeId').isMongoId().withMessage('Employee ID is required'),
  body('month').isInt({ min: 1, max: 12 }).withMessage('Month must be 1-12'),
  body('bonus').optional().isNumeric().withMessage('Bonus must be a number'),
  body('penalty').optional().isNumeric().withMessage('Penalty must be a number'),
  validateRequest,
  calculateSalaryRecord
);
router.get(
  '/report',
  protect,
  requireCompany,
  allowRoles('company_admin'),
  query('month').optional().isInt({ min: 1, max: 12 }).withMessage('Month must be 1-12'),
  validateRequest,
  reportSalaries
);
router.get(
  '/:employeeId',
  protect,
  requireCompany,
  allowRoles('company_admin'),
  param('employeeId').isMongoId().withMessage('Employee ID is required'),
  validateRequest,
  listEmployeeSalaries
);

module.exports = router;

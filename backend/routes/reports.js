const express = require('express');
const { generateReport, listReports } = require('../controllers/reportController');
const { protect, allowRoles } = require('../middleware/auth');

const router = express.Router();

router.post('/', protect, allowRoles('company_admin'), generateReport);
router.get('/', protect, allowRoles('company_admin'), listReports);

module.exports = router;

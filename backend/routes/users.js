const express = require('express');
const { listUsers, updateUserRole } = require('../controllers/userController');
const { protect, allowRoles } = require('../middleware/auth');

const router = express.Router();

router.get('/', protect, allowRoles('super_admin'), listUsers);
router.patch('/:id/role', protect, allowRoles('super_admin'), updateUserRole);

module.exports = router;

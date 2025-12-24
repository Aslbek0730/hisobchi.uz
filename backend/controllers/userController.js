const User = require('../models/User');

const listUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password');
    return res.json({ users });
  } catch (err) {
    return next(err);
  }
};

const updateUserRole = async (req, res, next) => {
  try {
    const { role } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    ).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
};

module.exports = { listUsers, updateUserRole };

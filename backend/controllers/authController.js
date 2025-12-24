const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Company = require('../models/Company');
const { generateToken } = require('../utils/token');

const register = async (req, res, next) => {
  try {
    const { fullName, email, password, companyName } = req.body;
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({
      fullName,
      email,
      password: hashed,
      role: 'company_admin'
    });

    if (companyName && companyName.trim()) {
      const company = await Company.create({
        name: companyName.trim(),
        ownerId: user._id
      });
      user.companyId = company._id;
      await user.save();
    }

    const token = generateToken(user);
    return res.status(201).json({
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        companyId: user.companyId
      }
    });
  } catch (err) {
    return next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user);
    return res.json({
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        companyId: user.companyId
      }
    });
  } catch (err) {
    return next(err);
  }
};

const me = async (req, res) => {
  return res.json({ user: req.user });
};

const resetPassword = async (req, res) => {
  return res.json({ message: 'Password reset link sent if the email exists' });
};

module.exports = { register, login, me, resetPassword };

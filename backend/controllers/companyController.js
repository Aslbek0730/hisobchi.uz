const Company = require('../models/Company');

const createCompany = async (req, res, next) => {
  try {
    const { name, subscriptionPlan } = req.body;
    const company = await Company.create({
      name,
      subscriptionPlan: subscriptionPlan || 'standard',
      ownerId: req.user._id
    });
    req.user.companyId = company._id;
    await req.user.save();
    return res.status(201).json({ company });
  } catch (err) {
    return next(err);
  }
};

const getCompany = async (req, res, next) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    if (
      req.user.role !== 'super_admin' &&
      company._id.toString() !== (req.user.companyId || '').toString()
    ) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    return res.json({ company });
  } catch (err) {
    return next(err);
  }
};

module.exports = { createCompany, getCompany };

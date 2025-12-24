const requireCompany = (req, res, next) => {
  if (!req.user || !req.user.companyId) {
    return res.status(400).json({ message: 'Company setup required' });
  }
  return next();
};

module.exports = { requireCompany };

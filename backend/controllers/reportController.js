const Salary = require('../models/Salary');
const Report = require('../models/Report');

const generateReport = async (req, res, next) => {
  try {
    const { year, month } = req.body;
    const query = {
      companyId: req.user.companyId,
      year: Number(year)
    };
    if (month) {
      query.month = Number(month);
    }

    const salaryQuery = {
      companyId: req.user.companyId,
      year: Number(year)
    };
    if (month) {
      salaryQuery.month = Number(month);
    }

    const salaries = await Salary.find(salaryQuery);
    const totalPayroll = salaries.reduce((sum, s) => sum + s.netSalary, 0);
    const employeeIds = new Set(salaries.map((s) => s.employeeId.toString()));

    const report = await Report.findOneAndUpdate(
      query,
      {
        totalPayroll,
        employeeCount: employeeIds.size,
        generatedBy: req.user._id
      },
      { new: true, upsert: true }
    );

    return res.status(201).json({ report });
  } catch (err) {
    return next(err);
  }
};

const listReports = async (req, res, next) => {
  try {
    const reports = await Report.find({ companyId: req.user.companyId });
    return res.json({ reports });
  } catch (err) {
    return next(err);
  }
};

module.exports = { generateReport, listReports };

const Salary = require('../models/Salary');
const Employee = require('../models/Employee');
const { calculateSalary } = require('../utils/salaryCalc');

const TAX_RATE = 0.12;

const calculateSalaryRecord = async (req, res, next) => {
  try {
    const { employeeId, month, bonus, penalty } = req.body;
    const employee = await Employee.findOne({
      _id: employeeId,
      companyId: req.user.companyId
    });
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    const { baseSalary, tax, total } = calculateSalary({
      baseSalary: employee.salary,
      taxRate: TAX_RATE,
      bonus: bonus || 0,
      penalty: penalty || 0
    });

    const salary = await Salary.create({
      employeeId,
      month,
      baseSalary,
      bonus: bonus || 0,
      penalty: penalty || 0,
      tax,
      total,
      status: 'unpaid'
    });

    return res.status(201).json({ salary });
  } catch (err) {
    return next(err);
  }
};

const listEmployeeSalaries = async (req, res, next) => {
  try {
    const employee = await Employee.findOne({
      _id: req.params.employeeId,
      companyId: req.user.companyId
    });
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    const salaries = await Salary.find({ employeeId: req.params.employeeId });
    return res.json({ salaries });
  } catch (err) {
    return next(err);
  }
};

const reportSalaries = async (req, res, next) => {
  try {
    const month = req.query.month ? Number(req.query.month) : null;
    const employees = await Employee.find({ companyId: req.user.companyId }).select('_id');
    const employeeIds = employees.map((e) => e._id);
    const query = { employeeId: { $in: employeeIds } };
    if (month) {
      query.month = month;
    }
    const salaries = await Salary.find(query);
    const totalPayroll = salaries.reduce((sum, s) => sum + s.total, 0);
    const paidCount = salaries.filter((s) => s.status === 'paid').length;
    return res.json({
      totalPayroll,
      recordCount: salaries.length,
      paidCount
    });
  } catch (err) {
    return next(err);
  }
};

module.exports = { calculateSalaryRecord, listEmployeeSalaries, reportSalaries };

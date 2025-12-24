const Employee = require('../models/Employee');

const createEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.create({
      fullName: req.body.fullName,
      position: req.body.position,
      salary: req.body.salary,
      workType: req.body.workType,
      companyId: req.user.companyId
    });
    return res.status(201).json({ employee });
  } catch (err) {
    return next(err);
  }
};

const listEmployees = async (req, res, next) => {
  try {
    const employees = await Employee.find({ companyId: req.user.companyId });
    return res.json({ employees });
  } catch (err) {
    return next(err);
  }
};

const getEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findOne({
      _id: req.params.id,
      companyId: req.user.companyId
    });
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    return res.json({ employee });
  } catch (err) {
    return next(err);
  }
};

const updateEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findOneAndUpdate(
      { _id: req.params.id, companyId: req.user.companyId },
      {
        fullName: req.body.fullName,
        position: req.body.position,
        salary: req.body.salary,
        workType: req.body.workType
      },
      { new: true }
    );
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    return res.json({ employee });
  } catch (err) {
    return next(err);
  }
};

const removeEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findOneAndDelete({
      _id: req.params.id,
      companyId: req.user.companyId
    });
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    return res.json({ message: 'Employee deleted' });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  createEmployee,
  listEmployees,
  getEmployee,
  updateEmployee,
  removeEmployee
};

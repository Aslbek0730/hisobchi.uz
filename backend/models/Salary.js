const mongoose = require('mongoose');

const salarySchema = new mongoose.Schema(
  {
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    month: { type: Number, required: true },
    baseSalary: { type: Number, required: true },
    bonus: { type: Number, default: 0 },
    penalty: { type: Number, default: 0 },
    tax: { type: Number, default: 0 },
    total: { type: Number, required: true },
    status: { type: String, enum: ['paid', 'unpaid'], default: 'unpaid' }
  },
  { timestamps: true }
);

salarySchema.index({ employeeId: 1, month: 1 }, { unique: true });

module.exports = mongoose.model('Salary', salarySchema);

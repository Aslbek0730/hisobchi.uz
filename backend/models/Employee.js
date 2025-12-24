const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    position: { type: String, required: true, trim: true },
    salary: { type: Number, required: true },
    workType: { type: String, enum: ['monthly', 'hourly'], required: true },
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Employee', employeeSchema);

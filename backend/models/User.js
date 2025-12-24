const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['super_admin', 'company_admin', 'employee'],
      default: 'company_admin'
    },
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', default: null }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);

const mongoose = require('mongoose');

const companySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    subscriptionPlan: { type: String, default: 'standard' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Company', companySchema);

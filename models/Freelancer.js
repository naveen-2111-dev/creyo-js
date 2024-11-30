// models/Freelancer.js
const mongoose = require('mongoose');

// Create Freelancer schema
const freelancerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  workType: { type: String, required: true },
  skills: { type: [String], required: true },
  experience: [{
    companyName: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    description: { type: String, required: true },
  }],
  paymentMethod: { type: String, required: true },
  language: { type: String, required: true },
  address: [{
    pincode: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    houseNo: { type: String, required: true },
    streetName: { type: String, required: true },
  }],
  dateOfBirth: { type: String, required: true },
});

// Create model
const Freelancer = mongoose.model('Freelancer', freelancerSchema);

module.exports = Freelancer;

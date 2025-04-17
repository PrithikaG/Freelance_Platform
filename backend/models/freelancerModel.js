const mongoose = require('mongoose');

const FreelancerSchema = new mongoose.Schema({
  name: String,
  email: String,
  resume: String,  // Resume in text format
  skills: [String],
  domain: String,
});

module.exports = mongoose.model('Freelancer', FreelancerSchema);

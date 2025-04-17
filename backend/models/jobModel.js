const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  domain: { type: String, required: true },
  requiredSkills: { type: [String], required: true },
});

module.exports = mongoose.model('Job', jobSchema);

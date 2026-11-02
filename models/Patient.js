const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  image: { type: String }
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;

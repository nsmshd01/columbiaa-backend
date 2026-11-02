const mongoose = require('mongoose');

const medicoSchema = new mongoose.Schema({
  name: { type: String },
  designation: { type: String },
  experience: { type: String },
  qualification: { type: String },
  bio: { type: String },
  phone: { type: String },
  email: { type: String },
  department: { type: String },
  image: { type: String },
  startTime: { type: String, required: true }, // e.g., "09:00 AM"
  endTime: { type: String, required: true },   // e.g., "05:00 PM"
  timeSlots: { type: [String], required: true } ,
    blockedDates: { type: [String], default: [] } // e.g. ["2025-12-06", "2025-12-10"]
});

const Medico = mongoose.model('Medico', medicoSchema);

module.exports = Medico;


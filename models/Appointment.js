const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  departmentName: { type: String },
  doctorName: { type: String },
  patientName: { type: String },
  phone: { type: String },
  email: { type: String },
  date: { type: Date },
  // time: { type: String },
  timeSlots: { type: [String] }, 
  message: { type: String },
  bookedAt: { type: Date, default: () => new Date() },
},
{ timestamps: true }
);

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;

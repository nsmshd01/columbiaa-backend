// controllers/AppointmentController.js
const Appointment = require('../models/Appointment');
require('dotenv').config();

// Register a new appointment
const registerAppointment = async (req, res) => {
  const { departmentName, doctorName, patientName,phone, email, date, timeSlots, message } = req.body;

  try {
    if (!Array.isArray(timeSlots) || timeSlots.length === 0) {
      return res.status(400).json({ message: 'Please select at least one time slot' });
    }
  
    const newAppointment = new Appointment({
      departmentName,
      doctorName,
      patientName,
      phone,
      email,
      date,
      timeSlots, // This should now be an array
      message,
    });

    await newAppointment.save();
    res.status(201).json({ message: 'Appointment registered successfully', appointment: newAppointment });
  } catch (error) {
    console.error('Error saving appointment:', error);
    res.status(500).json({ message: 'Failed to register appointment' });
  }
};

// const registerAppointment = async (req, res) => {
//   const { departmentName, doctorName, patientName, phone, email, date, timeSlots, message } = req.body;

//   try {
//     if (!Array.isArray(timeSlots) || timeSlots.length === 0) {
//       return res.status(400).json({ message: 'Please select at least one time slot' });
//     }

//     const newAppointment = new Appointment({
//       departmentName,
//       doctorName,
//       patientName,
//       phone,
//       email,
//       date,
//       timeSlots,
//       message,
//     });

//     await newAppointment.save();

//     // Ensure phone number is in E.164 format
//     const formattedPhone = phone.startsWith('+') ? phone : `+91${phone}`;

//     // Send SMS notification
//     const smsMessage = `Hello ${patientName}, your appointment with Doctor ${doctorName} on ${date} at ${timeSlots.join(
//       ', '
//     )} has been successfully booked. - Columbiaa Hospital, Bangalore.`;

//     await client.messages.create({
//       from: process.env.TWILIO_PHONE_NUMBER, // Replace with your Twilio SMS number
//       to: formattedPhone, // Corrected phone format
//       body: smsMessage,
//     });

//     res.status(201).json({ message: 'Appointment registered successfully', appointment: newAppointment });
//   } catch (error) {
//     console.error('Error saving appointment:', error);
//     res.status(500).json({ message: 'Failed to register appointment' });
//   }
// };



// Get all appointments
const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({});
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching appointments', error: error.message });
  }
};
const getAllAppointments1 = async (req, res) => {
  try {
    const appointments = await Appointment.find({});
    const bookedSlots = appointments.map(appt => ({
      doctorName: appt.doctorName,
      date: appt.date.toISOString().split('T')[0], // Ensure date format matches frontend
      timeSlots: appt.timeSlots
    }));
    res.status(200).json(bookedSlots);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching appointments', error: error.message });
  }
};


// Get appointment by ID
const getAppointmentById = async (req, res) => {
    const appointmentId = req.params.id;
  
    try {
      const appointment = await Appointment.findById(appointmentId);
      if (!appointment) {
        return res.status(404).json({ message: 'Appointment not found' });
      }
  
      // Format the date before sending response
      const formattedAppointment = {
        ...appointment._doc,
        date: appointment.date ? appointment.date.toISOString().split('T')[0] : '', // Extract YYYY-MM-DD
      };
  
      res.status(200).json(formattedAppointment);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching appointment', error: error.message });
    }
  };
  

// Update appointment by ID
const updateAppointment = async (req, res) => {
  const appointmentId = req.params.id;
  const updateData = req.body;

  try {
    const appointment = await Appointment.findByIdAndUpdate(appointmentId, updateData, { new: true });
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.status(200).json({ message: 'Appointment updated successfully', appointment });
  } catch (error) {
    res.status(500).json({ message: 'Error updating appointment', error: error.message });
  }
};

// Delete appointment by ID
const deleteAppointment = async (req, res) => {
  const appointmentId = req.params.id;

  try {
    const appointment = await Appointment.findByIdAndDelete(appointmentId);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.status(200).json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting appointment', error: error.message });
  }
};

module.exports = { registerAppointment, getAllAppointments, getAppointmentById, updateAppointment, deleteAppointment,getAllAppointments1 };

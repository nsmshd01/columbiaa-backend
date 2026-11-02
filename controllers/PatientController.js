// controllers/PatientController.js
const Patient = require('../models/Patient'); // Import the Patient model
const fs = require('fs');
const path = require('path');

// Register a new patient
const registerPatient = async (req, res) => {
  const { name, email, phone } = req.body;
  const image = req.file ? req.file.filename : null; // Handle image upload

  try {
    const newPatient = new Patient({
      name,
      email,
      phone,
      image,
    });

    await newPatient.save();
    res.status(201).json({ message: 'Patient registered successfully', patient: newPatient });
  } catch (error) {
    res.status(400).json({ message: 'Error registering patient', error: error.message });
  }
};

// Get all patients
const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find({});
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching patients', error: error.message });
  }
};

// Get patient by ID
const getPatientById = async (req, res) => {
  const patientId = req.params.id;

  try {
    const patient = await Patient.findById(patientId);

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching patient', error: error.message });
  }
};

// Update patient by ID
const updatePatient = async (req, res) => {
  const patientId = req.params.id;
  const updateData = { ...req.body };

  if (req.file) {
    const timestamp = Date.now();
    const originalName = req.file.originalname.replace(/\s+/g, '-');
    const formattedFileName = `${timestamp}-${originalName}`;

    const oldPath = req.file.path;
    const newPath = path.join(path.dirname(oldPath), formattedFileName);

    try {
      fs.renameSync(oldPath, newPath);
      updateData.image = formattedFileName;
    } catch (renameError) {
      return res.status(500).json({ message: 'Error renaming uploaded file', error: renameError.message });
    }
  }

  try {
    const patient = await Patient.findByIdAndUpdate(patientId, updateData, { new: true });

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    res.status(200).json({ message: 'Patient updated successfully', patient });
  } catch (error) {
    res.status(500).json({ message: 'Error updating patient', error: error.message });
  }
};

// Delete patient by ID
const deletePatient = async (req, res) => {
  const patientId = req.params.id;

  try {
    const patient = await Patient.findByIdAndDelete(patientId);

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    res.status(200).json({ message: 'Patient deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting patient', error: error.message });
  }
};

module.exports = { registerPatient, getAllPatients, getPatientById, updatePatient, deletePatient };

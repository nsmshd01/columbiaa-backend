const Medico = require('../models/Medico'); // Import the Medico model
const fs = require('fs');
const path = require('path');

const registerMedico = async (req, res) => {
  const { name, designation, experience, qualification, bio,phone, email,department, startTime, endTime, selectedTimeSlots } = req.body;
  const image = req.file ? req.file.filename : null;
  
  try {
    // Ensure selectedTimeSlots is properly parsed
    const parsedTimeSlots = selectedTimeSlots ? JSON.parse(selectedTimeSlots) : [];

    if (!Array.isArray(parsedTimeSlots) || parsedTimeSlots.length === 0) {
      return res.status(400).json({ message: 'Please select at least one time slot' });
    }

    const newMedico = new Medico({
      name,
      designation,
      qualification,
      experience,
      bio,
      phone,
      email,
      department,
      startTime,
      endTime,
      timeSlots: parsedTimeSlots, // Store only the selected time slots
      image,
    });

    await newMedico.save();
    res.status(201).json({ message: 'Medico registered successfully', medico: newMedico });
  } catch (error) {
    res.status(400).json({ message: 'Error registering medico', error: error.message });
  }
};



// Get all medicos
const getAllMedicos = async (req, res) => {
  try {
    const medicos = await Medico.find({});
    res.status(200).json(medicos);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching medicos', error: error.message });
  }
};

// Get medico by ID
const getMedicoById = async (req, res) => {
  const medicoId = req.params.id;

  try {
    const medico = await Medico.findById(medicoId);

    if (!medico) {
      return res.status(404).json({ message: 'Medico not found' });
    }

    res.status(200).json(medico);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching medico', error: error.message });
  }
};

// Update medico by ID
const updateMedico = async (req, res) => {
  const medicoId = req.params.id;
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
    const medico = await Medico.findByIdAndUpdate(medicoId, updateData, { new: true });

    if (!medico) {
      return res.status(404).json({ message: 'Medico not found' });
    }

    res.status(200).json({ message: 'Medico updated successfully', medico });
  } catch (error) {
    res.status(500).json({ message: 'Error updating medico', error: error.message });
  }
};

// Delete medico by ID
const deleteMedico = async (req, res) => {
  const medicoId = req.params.id;

  try {
    const medico = await Medico.findByIdAndDelete(medicoId);

    if (!medico) {
      return res.status(404).json({ message: 'Medico not found' });
    }

    res.status(200).json({ message: 'Medico deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting medico', error: error.message });
  }
};

// Block a specific date for a doctor (e.g., doctor on leave)
const blockDoctorDate = async (req, res) => {
  const { id } = req.params;
  const { date } = req.body; // Expect "YYYY-MM-DD"

  if (!date) {
    return res.status(400).json({ message: 'Date is required' });
  }

  try {
    const medico = await Medico.findByIdAndUpdate(
      id,
      { $addToSet: { blockedDates: date } }, // $addToSet avoids duplicates
      { new: true }
    );

    if (!medico) {
      return res.status(404).json({ message: 'Medico not found' });
    }

    res.status(200).json({ message: 'Date blocked successfully', medico });
  } catch (error) {
    res.status(500).json({ message: 'Error blocking date', error: error.message });
  }
};

// Check availability for a given date (and return slots if available)
const getDoctorAvailabilityForDate = async (req, res) => {
  const { id } = req.params;
  const { date } = req.query; // Expect "YYYY-MM-DD"

  if (!date) {
    return res.status(400).json({ message: 'Date is required' });
  }

  try {
    const medico = await Medico.findById(id);

    if (!medico) {
      return res.status(404).json({ message: 'Medico not found' });
    }

    const isBlocked = medico.blockedDates.includes(date);

    if (isBlocked) {
      return res.json({
        available: false,
        timeSlots: []
      });
    }

    // Doctor is available on that date
    return res.json({
      available: true,
      timeSlots: medico.timeSlots // or generate based on start/end if needed
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching availability', error: error.message });
  }
};


module.exports = { registerMedico, getAllMedicos, getMedicoById, updateMedico, deleteMedico,  blockDoctorDate,
  getDoctorAvailabilityForDate };

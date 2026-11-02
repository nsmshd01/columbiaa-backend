// controllers/DepartmentController.js
const Department = require('../models/Departments'); // Import the Department model
const fs = require('fs');
const path = require('path');

// Register a new department
const registerDepartment = async (req, res) => {
  const { departmentName, description } = req.body;
  const image = req.file ? req.file.filename : null; // Handle image upload

  try {
    const newDepartment = new Department({
      departmentName,
      description,
      image,
    });

    await newDepartment.save();
    res.status(201).json({ message: 'Department registered successfully', department: newDepartment });
  } catch (error) {
    res.status(400).json({ message: 'Error registering department', error: error.message });
  }
};

// Get all departments
const getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find({});
    res.status(200).json(departments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching departments', error: error.message });
  }
};

// Get department by ID
const getDepartmentById = async (req, res) => {
  const departmentId = req.params.id;

  try {
    const department = await Department.findById(departmentId);

    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }

    res.status(200).json(department);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching department', error: error.message });
  }
};

// Update department by ID
const updateDepartment = async (req, res) => {
  const departmentId = req.params.id;
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
    const department = await Department.findByIdAndUpdate(departmentId, updateData, { new: true });

    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }

    res.status(200).json({ message: 'Department updated successfully', department });
  } catch (error) {
    res.status(500).json({ message: 'Error updating department', error: error.message });
  }
};

// Delete department by ID
const deleteDepartment = async (req, res) => {
  const departmentId = req.params.id;

  try {
    const department = await Department.findByIdAndDelete(departmentId);

    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }

    res.status(200).json({ message: 'Department deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting department', error: error.message });
  }
};

module.exports = { registerDepartment, getAllDepartments, getDepartmentById, updateDepartment, deleteDepartment };
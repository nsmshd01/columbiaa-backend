const HealthPackage = require('../models/HealthPackage');

// Register a new health package
const registerHealthPackage = async (req, res) => {
  const { name, gender, price, discountPrice, text1, text2, text3, text4, text5, text6, text7, text8, text9, text10, text11, text12, text13, text14, text15,
    text16,
    text17,
    text18,
    text19,
    text20, } = req.body;

  try {
    const newHealthPackage = new HealthPackage({
      name,
      gender,
      price,
      discountPrice,
      text1,
      text2,
      text3,
      text4,
      text5,
      text6,
      text7,
      text8,
      text9,
      text10,
      text11,
      text12,
      text13,
      text14,
      text15,
      text16,
      text17,
      text18,
      text19,
      text20,
    });
    await newHealthPackage.save();
    res.status(201).json({ message: 'Health package registered successfully', healthPackage: newHealthPackage });
  } catch (error) {
    res.status(400).json({ message: 'Error registering health package', error: error.message });
  }
};

// Get all health packages
const getAllHealthPackages = async (req, res) => {
  try {
    const healthPackages = await HealthPackage.find({});
    res.status(200).json(healthPackages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching health packages', error: error.message });
  }
};

// Get health package by ID
const getHealthPackageById = async (req, res) => {
  const packageId = req.params.id;

  try {
    const healthPackage = await HealthPackage.findById(packageId);
    if (!healthPackage) {
      return res.status(404).json({ message: 'Health package not found' });
    }
    res.status(200).json(healthPackage);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching health package', error: error.message });
  }
};

// Update health package by ID
const updateHealthPackage = async (req, res) => {
  const packageId = req.params.id;
  const updateData = req.body;

  try {
    const healthPackage = await HealthPackage.findByIdAndUpdate(packageId, updateData, { new: true });
    if (!healthPackage) {
      return res.status(404).json({ message: 'Health package not found' });
    }
    res.status(200).json({ message: 'Health package updated successfully', healthPackage });
  } catch (error) {
    res.status(500).json({ message: 'Error updating health package', error: error.message });
  }
};

// Delete health package by ID
const deleteHealthPackage = async (req, res) => {
  const packageId = req.params.id;

  try {
    const healthPackage = await HealthPackage.findByIdAndDelete(packageId);
    if (!healthPackage) {
      return res.status(404).json({ message: 'Health package not found' });
    }
    res.status(200).json({ message: 'Health package deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting health package', error: error.message });
  }
};

module.exports = { registerHealthPackage, getAllHealthPackages, getHealthPackageById, updateHealthPackage, deleteHealthPackage };

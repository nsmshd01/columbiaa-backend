const ImageGallery = require('../models/ImageGallery'); // Import the ImageGallery model
const fs = require('fs');
const path = require('path');

// Add new image to gallery
const addImage = async (req, res) => {
  const { title,description } = req.body;
  const image = req.file ? req.file.filename : null;

  try {
    if (!image) {
      return res.status(400).json({ message: 'Image is required' });
    }

    const newImage = new ImageGallery({ title,description, image });
    await newImage.save();
    res.status(201).json({ message: 'Image added successfully', image: newImage });
  } catch (error) {
    res.status(400).json({ message: 'Error adding image', error: error.message });
  }
};



// Get all images
const getAllImages = async (req, res) => {
  try {
    const images = await ImageGallery.find({});
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching images', error: error.message });
  }
};

// Get image by ID
const getImageById = async (req, res) => {
  const imageId = req.params.id;

  try {
    const image = await ImageGallery.findById(imageId);
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }
    res.status(200).json(image);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching image', error: error.message });
  }
};

// Update image by ID
const updateImage = async (req, res) => {
  const imageId = req.params.id;
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
    const image = await ImageGallery.findByIdAndUpdate(imageId, updateData, { new: true });
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }
    res.status(200).json({ message: 'Image updated successfully', image });
  } catch (error) {
    res.status(500).json({ message: 'Error updating image', error: error.message });
  }
};

// Delete image by ID
const deleteImage = async (req, res) => {
  const imageId = req.params.id;

  try {
    const image = await ImageGallery.findByIdAndDelete(imageId);
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }
    res.status(200).json({ message: 'Image deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting image', error: error.message });
  }
};

module.exports = { addImage, getAllImages, getImageById, updateImage, deleteImage };
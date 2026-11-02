// TestimonialController.js (Controller)
const Testimonial = require('../models/Testimonials');
const fs = require('fs');
const path = require('path');

const registerTestimonial = async (req, res) => {
  const { name, designation, text } = req.body;
  const image = req.file ? req.file.filename : null;

  try {
    const newTestimonial = new Testimonial({
      name,
      designation,
      text,
      image,
    });

    await newTestimonial.save();
    res.status(201).json({ message: 'Testimonial registered successfully', testimonial: newTestimonial });
  } catch (error) {
    res.status(400).json({ message: 'Error registering testimonial', error: error.message });
  }
};

const getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find({});
    res.status(200).json(testimonials);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching testimonials', error: error.message });
  }
};

const getTestimonialById = async (req, res) => {
  const testimonialId = req.params.id;

  try {
    const testimonial = await Testimonial.findById(testimonialId);
    if (!testimonial) return res.status(404).json({ message: 'Testimonial not found' });

    res.status(200).json(testimonial);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching testimonial', error: error.message });
  }
};

const updateTestimonial = async (req, res) => {
  const testimonialId = req.params.id;
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
    const testimonial = await Testimonial.findByIdAndUpdate(testimonialId, updateData, { new: true });

    if (!testimonial) return res.status(404).json({ message: 'Testimonial not found' });

    res.status(200).json({ message: 'Testimonial updated successfully', testimonial });
  } catch (error) {
    res.status(500).json({ message: 'Error updating testimonial', error: error.message });
  }
};

const deleteTestimonial = async (req, res) => {
  const testimonialId = req.params.id;

  try {
    const testimonial = await Testimonial.findByIdAndDelete(testimonialId);

    if (!testimonial) return res.status(404).json({ message: 'Testimonial not found' });

    res.status(200).json({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting testimonial', error: error.message });
  }
};

module.exports = { registerTestimonial, getAllTestimonials, getTestimonialById, updateTestimonial, deleteTestimonial };
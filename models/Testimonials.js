const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  name: { type: String },
  designation: { type: String},
  text: { type: String },
  image: { type: String } // Optional if some testimonials might not have images
});

const Testimonial = mongoose.model('Testimonial', testimonialSchema);

module.exports = Testimonial;

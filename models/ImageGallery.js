const mongoose = require("mongoose");

const imageGallerySchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  image: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const ImageGallery = mongoose.model("ImageGallery", imageGallerySchema);

module.exports = ImageGallery;


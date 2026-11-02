// testimonialRoutes.js (Routes)
const express = require('express');
const { registerTestimonial, updateTestimonial, deleteTestimonial, getAllTestimonials, getTestimonialById } = require('../controllers/TestimonialController');
const multer = require('multer');
const path = require('path');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../uploads/testimonials/');
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

router.post('/add', upload.single('image'), registerTestimonial);
router.put('/update/:id', upload.single('image'), updateTestimonial);
router.delete('/delete/:id', deleteTestimonial);
router.get('/', getAllTestimonials);
router.get('/:id', getTestimonialById);

module.exports = router;

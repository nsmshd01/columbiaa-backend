const express = require('express');
const { registerMedico, updateMedico, deleteMedico, getAllMedicos, getMedicoById,  blockDoctorDate,
  getDoctorAvailabilityForDate } = require('../controllers/MedicoController');
const multer = require('multer');
const path = require('path');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../uploads/medicos/');
    console.log("Upload path:", uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

router.post('/add', upload.single('image'), registerMedico);
router.put('/update/:id', upload.single('image'), updateMedico);
router.delete('/delete/:id', deleteMedico);
router.get('/', getAllMedicos);
router.get('/:id', getMedicoById);

router.post('/:id/block-date', blockDoctorDate);
router.get('/:id/availability', getDoctorAvailabilityForDate);

module.exports = router;

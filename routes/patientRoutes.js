// routes/patientRoutes.js
const express = require('express');
const { registerPatient, updatePatient, deletePatient, getAllPatients, getPatientById } = require('../controllers/PatientController');
const multer = require('multer');
const path = require('path');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../uploads/patients/');
    console.log("Upload path:", uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

router.post('/add', upload.single('image'), registerPatient);
router.put('/update/:id', upload.single('image'), updatePatient);
router.delete('/delete/:id', deletePatient);
router.get('/', getAllPatients);
router.get('/:id', getPatientById);

module.exports = router;

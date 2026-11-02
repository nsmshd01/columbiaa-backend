// routes/departmentRoutes.js
const express = require('express');
const { registerDepartment, updateDepartment, deleteDepartment, getAllDepartments, getDepartmentById } = require('../controllers/DepartmentController');
const multer = require('multer');
const path = require('path');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../uploads/departments/');
    console.log("Upload path:", uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

router.post('/add', upload.single('image'), registerDepartment);
router.put('/update/:id', upload.single('image'), updateDepartment);
router.delete('/delete/:id', deleteDepartment);
router.get('/', getAllDepartments);
router.get('/:id', getDepartmentById);

module.exports = router;

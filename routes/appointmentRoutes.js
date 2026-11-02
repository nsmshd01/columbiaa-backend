// routes/appointmentRoutes.js
const express = require('express');
const { registerAppointment, getAllAppointments,getAllAppointments1, getAppointmentById, updateAppointment, deleteAppointment } = require('../controllers/AppointmentController');

const router = express.Router();

router.post('/add', registerAppointment);
router.get('/', getAllAppointments);
router.get('/all', getAllAppointments1);
router.get('/:id', getAppointmentById);
router.put('/update/:id', updateAppointment);
router.delete('/delete/:id', deleteAppointment);

module.exports = router;

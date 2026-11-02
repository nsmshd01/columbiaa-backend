const express = require('express');
const { registerHealthPackage, getAllHealthPackages, getHealthPackageById, updateHealthPackage, deleteHealthPackage } = require('../controllers/HealthPackageController');

const router = express.Router();

router.post('/add', registerHealthPackage);
router.get('/', getAllHealthPackages);
router.get('/:id', getHealthPackageById);
router.put('/update/:id', updateHealthPackage);
router.delete('/delete/:id', deleteHealthPackage);

module.exports = router;

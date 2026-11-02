const express = require('express');
const { incrementHvsbVisitor, getHvsbVisitorCount } = require('../controllers/hvsbVisitorController');

const router = express.Router();

// Use clear and distinct route paths
router.get('/hvsbvisit', incrementHvsbVisitor);    // For incrementing
router.get('/hvsbcount', getHvsbVisitorCount);     // For retrieving count

module.exports = router;

const express = require('express');
const { incrementVisitor, getVisitorCount } = require('../controllers/visitorController');

const router = express.Router();

router.get('/visit', incrementVisitor);
router.get('/count', getVisitorCount);

module.exports = router;

const express = require('express');
const { registerContact, getAllContacts, getContactById, updateContact, deleteContact } = require('../controllers/ContactController');

const router = express.Router();

router.post('/add', registerContact);
router.get('/', getAllContacts);
router.get('/:id', getContactById);
router.put('/update/:id', updateContact);
router.delete('/delete/:id', deleteContact);

module.exports = router;

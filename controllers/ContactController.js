const Contact = require('../models/Contact');

// Register a new contact
const registerContact = async (req, res) => {
  const { name, email, phone, location, subject, message } = req.body;

  try {
    const newContact = new Contact({ name, email, phone, location, subject, message });
    await newContact.save();
    res.status(201).json({ message: 'Contact registered successfully', contact: newContact });
  } catch (error) {
    res.status(400).json({ message: 'Error registering contact', error: error.message });
  }
};

// Get all contacts
const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({});
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contacts', error: error.message });
  }
};

// Get contact by ID
const getContactById = async (req, res) => {
  const contactId = req.params.id;

  try {
    const contact = await Contact.findById(contactId);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contact', error: error.message });
  }
};

// Update contact by ID
const updateContact = async (req, res) => {
  const contactId = req.params.id;
  const updateData = req.body;

  try {
    const contact = await Contact.findByIdAndUpdate(contactId, updateData, { new: true });
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(200).json({ message: 'Contact updated successfully', contact });
  } catch (error) {
    res.status(500).json({ message: 'Error updating contact', error: error.message });
  }
};

// Delete contact by ID
const deleteContact = async (req, res) => {
  const contactId = req.params.id;

  try {
    const contact = await Contact.findByIdAndDelete(contactId);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting contact', error: error.message });
  }
};

module.exports = { registerContact, getAllContacts, getContactById, updateContact, deleteContact };

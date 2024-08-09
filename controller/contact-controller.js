const contacts = require('../models/Contact');

const addContact = async (req, res) => {
  try {
    const { username, email, message } = req.body;
    const newContact = new contacts({ username, email, message });
    await newContact.save();
    res.status(201).json({ message: 'Contact added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add contact' });
  }
};

module.exports = {
  addContact
};
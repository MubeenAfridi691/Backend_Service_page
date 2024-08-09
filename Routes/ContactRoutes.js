
const express = require('express');
const router = express.Router();
const { addContact } = require('../controller/contact-controller');


router.post('/addcontact', addContact);
module.exports = router;
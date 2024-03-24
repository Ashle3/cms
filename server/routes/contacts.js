var express = require('express');
const contact = require("../models/contact.js");
const router = express.Router();
const {getContacts} = require("../controllers/contact.controller.js");

// router.get('/contacts', getContacts);





module.exports = router; 
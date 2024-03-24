const Contact = require("../models/contact.js");

const getContacts = async (req, res) => {
    try{
        const contacts = await Contact.find({});
        res.status(200).json(contacts);
    } catch(error) {
        res.status(500).json({message: error.message});
    }
};

module.exports = getContacts;
const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    id: {type: String, required: true},
    name: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: String, required: true},
    imageUrl: {type: String}
    // group?: {type: Contact[]}
});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
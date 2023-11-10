const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    message: { type: String, required: true },
    date_sent: { type: String, required: true }
})

module.exports = mongoose.model('message', MessageSchema);
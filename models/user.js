const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true},
    status_message: { type: String, default: '' },
    profile_picture: { type: Buffer, contentType: String },
    password: { type: String, required: true },
    date_joined: { type: Date, required: true }
})

module.exports = mongoose.model('user', UserSchema);
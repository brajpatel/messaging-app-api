const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, minLength: 3, maxLength: 18, required: true },
    email: { type: String, required: true},
    status_message: { type: String, maxLength: 50, default: '' },
    profile_picture: { data: Buffer, contentType: String },
    password: { type: String, minLength: 6, required: true },
    date_joined: { type: String, required: true },
    friends: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }]
})

module.exports = mongoose.model('user', UserSchema);
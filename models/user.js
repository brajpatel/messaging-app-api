const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, minLength: 3, required: true },
    email: { type: String, required: true},
    status_message: { type: String, default: '' },
    profile_picture: { data: Buffer, contentType: String },
    password: { type: String, minLength: 6, required: true },
    date_joined: { type: Date, required: true },
    friends: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }]
})

module.exports = mongoose.model('user', UserSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
    users: [{ type: Schema.types.ObjectId, ref: 'User', required: true }],
    messages: [{ type: Schema.types.ObjectId, ref: 'Message', required: true }]
})

module.exports = mongoose.model('chat', ChatSchema);
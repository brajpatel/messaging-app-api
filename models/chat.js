const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
    users: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
    messages: { type: Array, default: [] }
})

module.exports = mongoose.model('chat', ChatSchema);
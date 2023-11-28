const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    message: { type: String, maxLength: 120, required: true },
    date_created: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
})

module.exports = mongoose.model('post', PostSchema);
const mongoose = require('mongoose');

//Define Schema
const replySchema = new mongoose.Schema({
    text: {type: String, required: true}
});

//Create Mongoose Model
const Reply = mongoose.model('Reply', replySchema);

//Export Model
exports.Reply = Reply;


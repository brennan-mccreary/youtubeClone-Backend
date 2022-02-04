const mongoose = require('mongoose');
const { replySchema } = require('./reply');

//Define Schema
const commentSchema = new mongoose.Schema({
    videoId: {type: String, required: true},
    text: {type: String, required: true},
    likeCount: {type: Number, required: true, default: 0},
    dislikeCount: {type: Number, required: true, default: 0},
    replies: {type: [replySchema], default: []}
})


//Create Mongoose Model
const Comment = mongoose.model('Comment', commentSchema);

//Export Model
exports.Comment = Comment;
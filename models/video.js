//Imports
const mongoose = require('mongoose');

//Video Schema
const videoSchema = new mongoose.Schema({
    //required properties
});

//Video model
const Video = mongoose.model('Video', videoSchema);


//Exports
exports.Video = Video;
exports.videoSchema = videoSchema;
const { Comment } = require('../models/comment');
const express = require('express');
const { Reply } = require('../models/reply');
const router = express.Router();

//Endpoints
//POST Comments
router.post('/add', async (req, res) => {
    try{
        const comment = new Comment({
            videoId: req.body.videoId,
            text: req.body.text
        })

        await comment.save();
        return res.send(comment);
    } 
    catch(err) {
        return res.status(500).send(`Internal Server Error: ${err}`);
    }
});

//GET Comments by Video Id
router.get('/fetch/:id', async (req, res) => {
    try{
        console.log(req.params.id)
        const comments = await Comment.find({videoId:req.params.id});

        if(!comments) {
            return res.status(400).send(`No comments found for video: '${req.params.id}' found`)
        }

        return res.send(comments)
    } 
    catch(err) {
        return res.status(500).send(`Internal Server Error: ${err}`);
    }
});

//PUT Comment Like
router.put('/like/:id', async (req, res) => {
    try{
    
        const comment = await Comment.findByIdAndUpdate(
        req.params.id, { $inc: { likeCount: 1}}, {new: true});

        await comment.save();

        return res.send(comment);
    }
    catch(err) {    
        return res.status(500).send(`Internal Server Error: ${err}`)
    }
});

//PUT Comment Dislike
router.put('/dislike/:id', async (req, res) => {
    try{
    
        const comment = await Comment.findByIdAndUpdate(
        req.params.id, { $inc: { dislikeCount: 1}}, {new: true});

        await comment.save();

        return res.send(comment);
    }
    catch(err) {    
        return res.status(500).send(`Internal Server Error: ${err}`)
    }
});

//PUT Reply to Comment
router.post('/reply/:id', async (req, res) => {
    try{
        const comment = await Comment.findById(req.params.id);
        if(!comment) {
            return res.status(400).send(`The user with comment ${req.params.userId} does not exist.`);
        }

        const reply = new Reply({
            text: req.body.text
        });

        comment.replies.push(reply);

        await comment.save();
        return res.send(comment);
    } 
    catch(err) {
        return res.status(500).send(`Internal Server Error: ${err}`)
    }
});

//Export
module.exports = router;

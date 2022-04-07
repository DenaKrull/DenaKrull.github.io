const express = require('express');
var router = express.Router();
const Post = require('../models/post');
const authenticatedOnly = require('../authenticatedOnly');


router.route('/')
  .get(async (req, res, next) => {
    const skip = +req.query.skip || 0;
    const limit = +req.query.limit || 0;
    const thePosts = await Post.find().skip(skip).limit(limit).toArray();
    res.send(thePosts);
  })
  .post(authenticatedOnly, async (req, res, next) => {
    const newPost = new Post({
      title: req.body.title,
      body: req.body.body,
      author: req.session.user,
      date: new Date()
    });
    await newPost.save();
    res.status(201).send(newPost);
  })

router.post('/:id/comments', authenticatedOnly, async (req, res, next) => {
  const newComment = {
    body: req.body.body,
    author: req.session.user,
    date: new Date()
  };
  // const result = await Post.findByIdAndUpdate({ _id: req.params.id }, { $push: { comments: newComment } });
  // if (!result.modifiedCount) {
  //     return res.status(404).send('Post not found');
  //   }
  const post = await Post.findById(req.params.id);
  if (post) {
    post.comments = post.comments || [];
    post.comments.push(newComment);
    post.save();
  } else {
    return res.status(404).send('Post not found');
  }

  socketIo.emit('comment', { postId: req.params.id, comment: newComment });
  res.status(201).send(newComment);

})

module.exports = router;
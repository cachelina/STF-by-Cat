const Blog = require("../models/blog")
const Comment = require("../models/comment")
const { exploreBlog } = require('./blogs')

let createComment = async (req, res) => {
  try { 
    let blogId = req.params.id
    let commentContent = req.body.content
    await Comment.create({
      content: commentContent,
      blog_id: blogId
    }) 
    res.status(200).json({})
  }
  catch {
    res.status(422).json({})
  }
}

module.exports = {
  createComment
}


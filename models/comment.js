const mongoose = require('mongoose');
const Blog = require('./blog')

const CommentSchema = new mongoose.Schema({
  content: String,
  blog_id: String,
  created_at: Date,
}, {
  timestamps: true
});


const Comment = mongoose.model('Comment', CommentSchema);


module.exports = Comment


//blogId on comments schema
//relationships in mongoose 
//blogId on comments schema
//
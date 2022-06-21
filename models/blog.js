const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  title: String,
  entry: String,
  created_at: Date,
  user_id: String
})

const Blog = mongoose.model('Blog', BlogSchema);

module.exports = Blog



const Blog = require("../models/blog")
const Comment = require("../models/comment")
const User = require("../models/user")
const { userOrDefault } = require('../helpers');
const { userAuthenticated } = require('../middleware/index')

const home = async (req, res) => {
  try { 
    const blogs = await Blog.find({})
    res.render('home', { blogs, user: userOrDefault(req), authenticated: userAuthenticated(req) })
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occurred" })
  }
}

const newBlog = (req, res, next) => {
  try {
    if (userAuthenticated(req)) {
      res.render('new', { 
        user: userOrDefault(req), authenticated: userAuthenticated(req)
      })
      return null;
    }
    res.redirect('/login')
  } catch(err) {
    console.log('we are catching mane ', err)
  }
}

const createBlog = (req, res) => {
  Blog.create({
    ...req.body, 
    user_id: req.user._id,
    date: new Date(),
  }, (err, blog) => {
    if(err) {
      res.status(400).json(err)
      return
    }
    res.json(blog)
  })
}

const routesToRedirectTo = ['new']

const exploreBlog = async (req, res, next) => {
  let blogId = req.params.id
  if (routesToRedirectTo.includes(blogId)) {
    res.render(`blogs/${blogId}`)
  }
  let comments = await Comment.find({ blog_id: blogId})
  let blog = await Blog.findById(blogId).lean()
  let userId = blog.user_id 
  let createdByUser = await User.findById(userId).lean()
  const data = {
    blog: {
      ...blog,
      user: createdByUser,
    }
  }

  res.render('exploreBlog', { 
    title: 'my explore page', 
    blog: { 
      ...blog, 
      user: createdByUser,
    }, 
    user: userOrDefault(req), 
    authenticated: userAuthenticated(req), 
    comments,
  })
}


const editBlog = async (req,res) => {
  let blogId = req.params.id
  let user = req.user
  let blog = await Blog.findById(blogId)
  if (blog.user_id != user._id) {
    res.redirect('/', { error: "You are not authorized to perform this action.", status: 422})
  } else {
    Blog.findById(blogId)
      .then((blog) => {
        res.render('editBlog', { title: 'my edit blog page', blog, user: userOrDefault(req), authenticated: userAuthenticated(req) })
      })
  }
}

const updateBlog = async(req, res) => {
 try {
    const blogId = req.params.id;
    let blog = await Blog.findByIdAndUpdate(blogId, {
      title: req.body.title, entry: req.body.entry
    });
    res.redirect('/')
  }
  catch (error) {
    console.log('error is ', error) 
    res.status(400).send({ message: error.message || 'error UpdateBlog' }) 
  }
}

const deleteBlog = (req, res) => {
  try {
    let blogId = req.params.id
    Blog.findByIdAndDelete(blogId)
      .then((blog) => {
        res.redirect('/')
      })
  } 
  catch (error) {
    res.status(500).send({ message: error.message || 'error at deleteBlog' })
  }
 }


module.exports = {
  home,
  newBlog,
  createBlog,
  exploreBlog,
  deleteBlog, 
  editBlog, 
  updateBlog,
  userAuthenticated,
}
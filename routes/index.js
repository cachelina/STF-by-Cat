const express = require('express');
const router = express.Router();
const passport = require('passport')
const { home, newBlog, createBlog, exploreBlog, deleteBlog, updateBlog, editBlog } = require('../controllers/blogs')
const { createComment } = require('../controllers/comments')
const { ensureLoggedIn, userAuthenticated } = require('../middleware')

router.get('/', home);

router.get('/blogs/new', ensureLoggedIn, newBlog)

router.post('/blogs', ensureLoggedIn, createBlog)

router.get('/blogs/:id', exploreBlog)

router.get('/blogs/:id/edit', ensureLoggedIn, editBlog)

router.put('/blogs/:id', ensureLoggedIn, updateBlog)

router.delete('/blogs/:id', ensureLoggedIn, deleteBlog)

router.post('/blogs/:id/comments', ensureLoggedIn, createComment)

router.get('/login',  passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

router.get('/login-error', (req, res, next) => {
  res.render('login-error')
})

router.get('/oauth2callback',  passport.authenticate(
  'google',
  {
    successRedirect: '/',
    failureRedirect: '/login-error'
  }
));

router.post('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {return next (err)}
    res.redirect('/');
  });
});



module.exports = router
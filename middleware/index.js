const Blog = require("../models/blog")

const userAuthenticated = (req) => {
  if (req.isAuthenticated) {
    let authenticated = req.isAuthenticated()
    return authenticated
  }
  return false
}

const ensureLoggedIn = (req, res, next) => {
  if (userAuthenticated(req)) {
    next()
  } else {
    res.redirect('/login')
  }
}

module.exports = {
  ensureLoggedIn,
  userAuthenticated,
}
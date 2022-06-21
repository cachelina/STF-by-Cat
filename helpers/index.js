const userOrDefault = (req) => {
  if (req.user) {
    return req.user
  }
  return {}
}

module.exports = {
  userOrDefault
}
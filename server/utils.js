const adminsOnly = (req, res, next) => {
  if (!req.user.admin) {
    const err = new Error("Wait, that's illegal")
    err.status = 401
    return next(err)
  }
  next()
}

const currentUserOnly = (req, res, next) => {
  if (req.user.id !== Number(req.params.userId)) {
    const err = new Error("Wait, that's illegal")
    err.status = 401
    return next(err)
  }
  next()
}

const adminOrCurrentUser = (req, res, next) => {
  if (req.user.id === Number(req.params.userId) || req.user.admin) {
    next()
  } else {
    const err = new Error('Not your Page!')
    err.status = 401
    return next(err)
  }
}

module.exports = {adminsOnly, currentUserOnly, adminOrCurrentUser}

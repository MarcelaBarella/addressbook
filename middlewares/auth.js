const jwt = require('jsonwebtoken')

const extractTokenFromAuth = (auth = '') => {
  if (!auth.includes('Bearer')) {
    throw Error('Please, send a valid Authorization Header.')
  }

  return auth.replace('Bearer ', '')
}

module.exports = (req, res, next) => {
  try {
    const { authorization } = req.headers
    const token = extractTokenFromAuth(authorization)

    if (!token) {
      const error = new Error('Not Authorized!')
      error.status = 403
      next(error)
    }

    const { id } = jwt.verify(token, process.env.JWT_SECRET)
    req.user = { id }

    next()
  } catch (error) {
    error.status = 401
    next(error)
  }
}

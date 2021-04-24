const jwtGenerator = require('../utils/jwtGenerator')
const { user } = require('../models')
const { encrypt, validatePassword } = require('../utils/password')

const User = {}

User.register = async (req, res, next) => {
  const { email, password } = req.body

  // TODO: improve register validations (a more complex email and password validation)
  if (!email || !password) {
    const error = new Error('You must provide a valid email and password!')
    error.status = 400
    return next(error)
  }

  try {
    const hash = await encrypt(password)
    const newUser = await user.create({
      raw: true,
      email: email,
      password: hash
    })

    const token = jwtGenerator(newUser.id)

    return res.status(201).json({ token })
  } catch (error) {
    error.status = 400
    next(error)
  }
}

User.login = async (req, res, next) => {
  const { email, password } = req.body
  const logedUser = await user.findOne({ where: { email: email } })

  try {
    if (!logedUser) {
      const error = new Error('User Not Found!')
      error.status = 404
      return next(error)
    }

    const encryptedPassword = await validatePassword(
      password,
      logedUser.password
    )

    if (!encryptedPassword) {
      const error = new Error('Invalid Password!')
      error.status = 401
      return next(error)
    }

    return res.json({ token: jwtGenerator(logedUser.id) })
  } catch (error) {
    error.status = 401
    next(error)
  }
}

module.exports = User

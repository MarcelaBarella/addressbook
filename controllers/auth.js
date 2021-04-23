const { JsonWebTokenError } = require('jsonwebtoken');
const jwtGenerator = require('../utils/jwtGenerator');
const { user } = require('../models');
const { encrypt, validatePassword } = require('../utils/password');

const User = {}


User.register = async (req, res) => {
    const { email, password } = req.body
    try {
        const hash = await encrypt(password)
        const newUser = await user.create({ raw: true, email: email, password: hash });

        const token = jwtGenerator(newUser.id)

        return res.status(201).json({ token })
    } catch(error) {

        res.status(400).json({ message: error.message })
    }
}

User.login = async (req, res) => {
    const { email, password } = req.body;
    const logedUser = await user.findOne({ where: { email: email } })
    
    try {
        if(!logedUser) {
            return res.status(404).send({ message: 'E-mail not found!'})
        }

        const encryptedPassword = await validatePassword(password, logedUser.password)

        if(!encryptedPassword) {
            return res.status(401).json({ message: 'Invalid password'});
        }

        return res.json({ token: jwtGenerator(logedUser.id) })
    } catch (error) {
        res.json({ message: error.message })
    }
}

module.exports = User;
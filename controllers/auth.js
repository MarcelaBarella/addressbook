const { JsonWebTokenError } = require('jsonwebtoken');
const { user } = require('../models');
const { encrypt, decrypt } = require('../utils/password');

const User = {}


User.register = async (req, res) => {
    const { email, password } = req.body
    try {
        const hash = await encrypt(password)
        const newUser = await user.create({ raw: true, email: email, password: hash })

        const token = await JsonWebTokenError(newUser)

        return res.status(201).json({ token })
    } catch(error) {
        res.status(400).json({ message: error.message })
    }
}

User.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await user.findOne({ where: { email: email } })
    try {
        if(!user) {
            return res.status(404).send({ message: 'E-mail not found!'})
        }

        const encryptedPassword = await decrypt(password, user.password)

        if(!encryptedPassword) {
            return res.status(401).json({ message: 'Invalid password'});
        }

        res.json({ token: await JwtGenerator(user.id) })
    } catch (error) {
        res.json({ message: error.message })
    }
}



module.exports = User;
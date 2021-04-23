const jwt = require('jsonwebtoken');
require('dotenv').config()

const extractTokenFromAuth = (auth = '') => {
    if(!auth.includes('Bearer')) {
        throw Error('Please, send a valid Authorization Header.');
    }

    return auth.replace('Bearer ', '');
}

module.exports = (req, res, next) => {
    try {
        const { authorization } = req.headers;
        const token = extractTokenFromAuth(authorization);

        if (!token) {
            // TODO: review all error messages
            return res.status(403).json({ message: 'Not Authorized' });
        }

        const { id } = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id }

        next()
    } catch (error) {
        return res.status(401).json({ message: error.message })
    }
}
const jwt = require('jsonwebtoken');
require('dotenv').config()

module.exports = async (req, res, next) => {
    try {
        const jwtToken = req.header('token');

        if (!jwtToken) {
            res.json({ message: 'Not Authorized' });
        }

        const payload =  await jwt.verify(jwtToken, process.env.JWT_SECRET);
        req.user = payload.user;
    } catch (error) {
        res.json({ message: 'Not Authorized '})
    }
}
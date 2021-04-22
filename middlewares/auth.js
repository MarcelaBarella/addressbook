const jwt = require('jsonwebtoken');
require('dotenv').config()

module.exports = async (req, res, next) => {
    // TODO: Fix
    try {
        const jwtToken = req.rawHeaders('token');

        console.log(req)
        
        if (!jwtToken) {
            res.status(403).json({ message: 'Not Authorized' });
        }

        const payload =  await jwt.verify(jwtToken, process.env.JWT_SECRET);
        req.user = payload.user;

        next()
    } catch (error) {
        res.status(401).json({ message: 'Invalid token!'})
    }
}
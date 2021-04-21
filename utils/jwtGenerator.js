const jwt = require("jsonwebtoken");
require('dotenv').config();

module.exports = async (id) =>  {
    const payload = {
        user: id
    }
    return await jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: 180});
}
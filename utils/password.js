
const bcrypt = require('bcrypt')

// Method to encrypt the password
const encrypt = async (password) => {
    
    const salt = await bcrypt.genSalt(10)
    console.log(salt)
    const hash = bcrypt.hash(password, salt)

    return hash
}

const decrypt = async (password, userPassword) => {
    const validPassword = await bcrypt.compare(password, userPassword)
    
    return validPassword
}

module.exports = { encrypt, decrypt }

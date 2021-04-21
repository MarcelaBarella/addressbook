const Model = require('../models/User');
const crypto = require('crypto');
const JwtGenerator = require('../utils/jwtGenerator');

const User = {}

User.getAll = (req, res) =>  {
    Model.findAll()
        .then(result => res.json(({ total: (result || []).length, items: result }) || []))
        .catch(() => res.json({ message: 'Something gonne wrong, cant get all the users' }));
}

User.register = async (req, res) => {
    const { email, password } = req.body;
    Model.findOne({ where: { email: email } })
    .then((user) => {

        if(user) {
            res.json({ message: 'This user already exists!' })
        }

        // Create a user with encrypted password
        const salt = crypto.randomBytes(16).toString('hex');
        const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);

        
        // dafuq
        //maybe change that because of the embedded then
        Model.create({ raw: true, email: email, password: hash })
        .then(async (newUser) => { 
            // this async wait in here is wrong?    
            res.status(200).json({ token: await JwtGenerator(newUser.id) })
        })
    })
    
}


User.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await Model.findOne({ where: { email: email } })
    if(!user) {
        return res.status(404).send({ message: 'Invalid e-mail '})
    }

    // Decrypt the user password to verify if it is correct
    const verified = crypto.createVerify('SHA256');
    if(verified.verify(user.password, password)) {
        return res.status(401).json({ message: 'Invalid password!'})
    }
    
    return res.status(200).json({ message: 'User logged' })
}

User.getUserById = (req, res) => {
    const id = req.body
    return Model.findAll({ where: {id: id }})
    .then(result => res.json(result || {}))
    .catch(() => res.json({ message: 'Something gonne wrong, cant get some user by email' }));
}




module.exports = User;
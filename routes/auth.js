const router = require('express').Router();
const User = require('../controllers/auth');
const { body } = require('express-validator');
const authorization = require('../middlewares/auth');


router.post('/register', 
    body('email').isEmail(),
    async (req, res) => {
    await User.register(req, res)
});

router.post('/login',
    body('email').isEmail(),
    authorization,
    async (req, res) => {
    await User.login(req, res)
});

// router.post('/logout', async (req, res) => {
//     res.json({ })
// })


router.get('/', async (req, res) => {
    await User.getAll(req, res)
});

router.get('/user', async (req, res) => {
    await User.getByEmail(req, res);
});

module.exports = router;
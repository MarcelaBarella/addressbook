const router = require('express').Router();
const User = require('../controllers/auth');
const authorization = require('../middlewares/auth');


router.post('/register', 
    async (req, res) => {
    await User.register(req, res)
});

router.post('/login',
    async (req, res) => {
    await User.login(req, res)
});


router.get('/', async (req, res) => {
    await User.getAll(req, res)
});

router.get('/user', async (req, res) => {
    await User.getByEmail(req, res);
});

module.exports = router;
const router = require('express').Router();
const User = require('../controllers/auth');

router.post('/register',
    async (req, res) => {
    await User.register(req, res)
});

router.post('/login',
    async (req, res) => {
    await User.login(req, res)
});

module.exports = router;
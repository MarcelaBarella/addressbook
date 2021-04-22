const express = require('express');
const router = express.Router();
const Contacts = require('../../controllers/contacts');
const auth = require('../../middlewares/auth');

/**
 * TODO: review routes paths
 */
router.get('/',
    async (req, res) => {
    await Contacts.getAll(req, res);
});

router.get('/:id', async (req, res) => {
    await Contacts.get(req, res);
});

// Works but for some reason aways sends error message
router.post('/create', Contacts.create);

router.delete('/delete/:id', async (req, res) => {
    await Contacts.delete(req, res);
});

router.put('/update/:id', async (req, res) => {
    await Contacts.update(req, res);
});

module.exports = router;
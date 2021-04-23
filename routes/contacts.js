const express = require('express');
const router = express.Router();
const Contacts = require('../controllers/contacts');
const authorization = require('../middlewares/auth');

router.get('/', authorization, Contacts.getAll);

router.get('/:id', authorization, Contacts.get);

router.post('/', authorization, Contacts.create);

router.patch('/:id', authorization, Contacts.update);

router.delete('/:id', authorization, Contacts.delete);

module.exports = router;
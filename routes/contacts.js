const express = require('express');
const router = express.Router();
const Contacts = require('../controllers/contacts');
const authorization = require('../middlewares/auth');

router.get('/', authorization, Contacts.getAll);

router.get('/:id', authorization, Contacts.get);

router.post('/create', authorization, Contacts.create);

router.delete('/delete/:id', authorization, Contacts.delete);

router.put('/update/:id', authorization, Contacts.delete);


module.exports = router;
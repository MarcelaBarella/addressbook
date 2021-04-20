const express = require('express');
const router = express.Router();
const Contacts = require('../../controllers/contacts');


router.get('/', (req, res) => {
    Contacts.getAll(req, res);
});

router.get('/:id', (req, res) => {
    Contacts.get(req, res);
});

router.post('/create', async (req, res) => {
    Contacts.create(req, res);
});

router.delete('/delete/:id', (req, res) => {
    Contacts.delete(req, res);
});

router.put('/update/:id', (req, res) => {
    Contacts.update(req, res);
});

module.exports = router;
const database = require('../config/firebase');

const Contacts = {}

// Works but for some reason aways sends error message
Contacts.getAll = (req, res) => {
    return database.ref('contacts/').get()
    .then((results) => { res.status(200).send(results)})
    .catch(() => res.status(404).json({ message: 'Could not found the contacts'}));
};

// Works but still sending 200 status when called with the wrong id
Contacts.get = (req, res) => {
    var contactId = req.params.id;
    database.ref('contacts/' + contactId).get()
    .then((result) => { res.status(200).send(result)})
    .catch(() => res.status(404).json({ message: 'Could not found this contact' }));
};

// Works but for some reason aways sends error message
Contacts.create = (req, res) => {
    database.ref('/contacts').push({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone_number: req.body.phone_number,
        address: req.body.address
    })
    .then((contact) => {
        const createdContact = {
            dataId: contact.key,
            first_name: contact.val().first_name,
            last_name: contact.val().last_name,
            phone_number: contact.val().phone_number,
            address: contact.val().first_name
        };
        res.status(200).send(createdContact)})
    .catch(() => { res.status(403).json({ message: 'Could not create the contact' });
    });
};

// Seemns to work as expected
Contacts.delete = (req, res) => {
    const contactId = req.params.id
    database.ref('contacts/' + contactId).remove()
    .then(() => { res.status(200).json({ message: 'Contact was deleted with success'})})
    .catch(() => { res.status(403).json({message: 'Could not delete the contact'})});
};

// Works but for some reason aways sends error message
Contacts.update = (req, res) => {
    const contactId = req.params.id
    database.ref('contacts/').child(contactId).update({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            phone_number: req.body.phone_number,
            address: req.body.address
        })
    .then((contact) => { res.status(200).send(contact.val())})
    .catch(() => { res.status(403).json({message: 'Could not update the contact'})});
};

module.exports = Contacts;
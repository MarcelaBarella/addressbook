const database = require('../config/firebase');

const Contacts = {}


Contacts.getAll = async (req, res) => {
    const result = await database.ref('contacts/').get()

    if(!result) {
      return res.status(404).json({ message: 'Could not found contacts' })
    }

    return res.status(200).json({ result })
};


Contacts.get = async (req, res) => {
    const id = req.params.id;
    const result = await database.ref('contacts/' + id).get()

    if(!result) {
      return res.status(404).json({ message: 'Could not found this contact' })
    }

    return res.status(200).json({ result })
};

const getContactFromBody = ({
    first_name = '',
    last_name = '',
    phone_number = '',
    address = '',
}) => ({
    first_name,
    last_name,
    phone_number,
    address,
});

const isValidContact = (contact) =>
    Object.values(contact).every(info => !!info.length);

Contacts.create = async (req, res) => {
    const { body } = req;
    const contact = getContactFromBody(body);

    if (!isValidContact(contact)) {
        return res.status(400).json({ message: 'Please, send a valid Contact.' });
    }

    const result = await database.ref('/contacts').push(contact);

    return res.status(201).json({ result });
};


Contacts.delete = async (req, res) => {
    const contactId = req.params.id
    const result = await database.ref('contacts/' + contactId).remove()

    if (result) {
      return res.status(404).json({ message: 'Contact not found'})
    }

    return res.status(200).json({ message: 'Contact Successfully deleted'})
};

// pq q da ruim com o id?
Contacts.update = async (req, res) => {
  const { params, body } = req;
  const id = params.id
  const contact = getContactFromBody(body);
  
  if (!isValidContact(contact)) {
    return res.status(400).json({ message: 'Please, send a valid Contact.' });
  }

  const result = await database.ref('/contacts').child(id).update(contact)
  return res.status(201).json({ result })
};

module.exports = Contacts;
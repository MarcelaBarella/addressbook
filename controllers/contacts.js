const database = require('../config/firebase');

const Contacts = {}

const CONTACT_SCHEMA_KEYS = [
  'first_name',
  'last_name',
  'phone_number',
  'address',
]

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

const getCleanedInfoContact = (body) => Object.keys(body).reduce((accumulator, cur) => {
  if(!CONTACT_SCHEMA_KEYS.includes(cur)) {
    return accumulator;
  }

  return { ...accumulator, [cur]: body[cur] };
}, {})

Contacts.getAll = async (req, res) => {
    const { user } = req;

    const result = await database.ref(`users/${user.id}/contacts`).get();

    if(!result.val()) {
      return res.status(404).json({ message: 'Could not found contacts' })
    }

    return res.status(200).json({ result })
};

Contacts.get = async (req, res) => {
    const { id } = req.params;
    const { user } = req;

    const result = await database.ref(`users/${user.id}/contacts/${id}`).get();

    if(!result) {
      return res.status(404).json({ message: 'Could not found this contact' })
    }

    return res.status(200).json({ result })
};

Contacts.create = async (req, res) => {
    const { body, user } = req;
    const contact = getContactFromBody(body);

    if (!isValidContact(contact)) {
        return res.status(400).json({ message: 'Please, send a valid Contact.' });
    }

    const { key } = await database.ref(`users/${user.id}/contacts`).push(contact);
    const result = await database.ref(`users/${user.id}/contacts/${key}`).get();

    return res.status(201).json({ result });
};

Contacts.update = async (req, res) => {
  const { params: { id }, body, user } = req;

  const newInfoContact = getCleanedInfoContact(body);

  const contact = await database.ref(`users/${user.id}/contacts/${id}`).get();

  if(!contact.val()) {
    return res.status(404).json({ message: 'Could not found this contact' })
  }

  await database.ref(`users/${user.id}/contacts/${id}`).update(newInfoContact);

  return res.status(200).json({ message: 'Contact successfully updated'})
};

Contacts.delete = async (req, res) => {
    const { id } = req.params;
    const { user } = req;

    try {
      const contact = await database.ref(`users/${user.id}/contacts/${id}`).get();

      if (!contact.val()) {
        return res.status(404).json({ message: 'Contact not found'});
      }

      await database.ref(`users/${user.id}/contacts/${id}`).remove();
    } catch(error) {
      return res.status(500).json({ message: 'Something went wrong while removing contact! Please, try again later.' });
    }
    
    return res.status(200).json({ message: 'Contact successfully deleted'});
};

module.exports = Contacts;
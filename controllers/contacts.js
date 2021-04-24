const database = require('../config/firebase')

const getContactFromBody = ({
  first_name = '',
  last_name = '',
  phone_number = '',
  address = ''
}) => ({
  first_name,
  last_name,
  phone_number,
  address
})

const isValidContact = (contact) =>
  Object.values(contact).every((info) => !!info.length)

const CONTACT_SCHEMA_KEYS = [
  'first_name',
  'last_name',
  'phone_number',
  'address'
]
const getCleanedInfoContact = (body) =>
  Object.keys(body).reduce((accumulator, current) => {
    if (!CONTACT_SCHEMA_KEYS.includes(current)) {
      return accumulator
    }

    return { ...accumulator, [current]: body[current] }
  }, {})

const Contacts = {}

Contacts.getAll = async (req, res, next) => {
  const { user } = req

  try {
    const result = await database.ref(`users/${user.id}/contacts`).get()
    return res.status(200).json({ result })
  } catch (error) {
    next(error)
  }
}

Contacts.get = async (req, res, next) => {
  const { id } = req.params
  const { user } = req

  const result = await database.ref(`users/${user.id}/contacts/${id}`).get()

  if (!result.val()) {
    const error = new Error('Could not found this contac')
    error.status = 404
    return next(error)
  }

  return res.status(200).json({ result })
}

Contacts.create = async (req, res, next) => {
  const { body, user } = req
  const contact = getContactFromBody(body)

  if (!isValidContact(contact)) {
    const error = new Error('Please, send a valid Contact.')
    error.status = 400
    return next(error)
  }

  const { key } = await database.ref(`users/${user.id}/contacts`).push(contact)
  const result = await database.ref(`users/${user.id}/contacts/${key}`).get()

  return res.status(201).json({ result })
}

Contacts.update = async (req, res, next) => {
  const {
    params: { id },
    body,
    user
  } = req

  const newInfoContact = getCleanedInfoContact(body)

  const contact = await database.ref(`users/${user.id}/contacts/${id}`).get()

  if (!contact.val()) {
    const error = new Error('Could not found this contact')
    error.status = 404
    return next(error)
  }

  await database.ref(`users/${user.id}/contacts/${id}`).update(newInfoContact)

  return res.status(200).json({ message: 'Contact successfully updated' })
}

Contacts.delete = async (req, res, next) => {
  const { id } = req.params
  const { user } = req

  try {
    const contact = await database.ref(`users/${user.id}/contacts/${id}`).get()

    if (!contact.val()) {
      const error = new Error('Contact not found')
      error.status = 404
      return next(error)
    }

    await database.ref(`users/${user.id}/contacts/${id}`).remove()
  } catch (error) {
    return next(error)
  }

  return res.status(200).json({ message: 'Contact successfully deleted' })
}

module.exports = Contacts

const CONTACT_SCHEMA_KEYS = [
  'first_name',
  'last_name',
  'phone_number',
  'address'
]

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

module.exports = { CONTACT_SCHEMA_KEYS, getContactFromBody }

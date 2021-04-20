const { database } = require('../config/firebase');

const insertOnTable = async (values) => {
    return database.ref('/contacts').push({
        first_value: values.first_value,
        last_name: values.last_name,
        phone_number: req.body.phone_number,
        address: req.body.address
    });
}

const query = async (values) => {
    return database.ref('contacts/' + contactId).get()
}